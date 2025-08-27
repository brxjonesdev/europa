/* eslint-disable @typescript-eslint/no-explicit-any */
import { Objective, Task, Topic } from './types';
import { createClient } from '@/lib/supabase/client';
import { err, ok, Result } from '@/shared/types';

export interface KnowledgeBaseRepository {
  // Topics
  createTopic(topic: Topic): Promise<Topic>;
  getTopicById(id: string): Promise<Topic | null>;
  updateTopic(topic: Topic): Promise<Topic | null>;
  deleteTopic(id: string): Promise<boolean>;
  getUserTopics(userId: string): Promise<Topic[]>;

  // Learning Objectives
  createLearningObjective(
    objective: Objective,
  ): Promise<Objective>;
  createManyLearningObjectives(
    objectives: Objective[],
  ): Promise<Objective[]>;
  getLearningObjectiveById(id: string): Promise<Objective | null>;
  updateLearningObjective(
    objective: Objective,
  ): Promise<Objective | null>;
  deleteLearningObjective(id: string): Promise<boolean>;
  getLearningObjectivesByTopicId(topicId: string): Promise<Objective[]>;
}

export const KnowledgeBaseRepository = {
  createTopic: async (topic: Topic): Promise<Result<Topic, string>> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('topic').insert(topic).single();

    console.log(data, error, 'boos');

    if (error) {
      return err(`Failed to create topic: ${error.message}`);
    }
    return ok(data);
  },
  getTopicById: async (id: string): Promise<Topic | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('topic')
      .select(
        `
      id,
      owner_id,
      title,
      description,
      created_at,
      reasoning,
      objective (
        id,
        topic_id,
        title,
        description,
        reasoning,
        task (
          id,
          objective_id,
          title,
          description,
          completed
        )
      )
    `,
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching topic:', error);
      return null;
    }

    // Map into strong types
    const topic: Topic = {
      id: data.id,
      ownerId: data.owner_id,
      title: data.title,
      description: data.description,
      createdAt: data.created_at,
      reasoning: data.reasoning,
      objectives: (data.objective || []).map(
        (obj: any): Objective => ({
          id: obj.id,
          topicId: obj.topic_id,
          title: obj.title,
          description: obj.description,
          reasoning: obj.reasoning,
          tasks: (obj.task || []).map(
            (t: any): Task => ({
              id: t.id,
              objectiveId: t.objective_id,
              title: t.title,
              description: t.description,
              completed: t.completed,
            }),
          ),
        }),
      ),
    };

    return topic;
  },
  updateTopic: async (
    id: string,
    topic: Partial<Topic>,
  ): Promise<Result<boolean, string>> => {
    const supabase = await createClient();
    const { error } = await supabase
      .from('topic')
      .update({
        title: topic.title,
        description: topic.description,
      })
      .eq('id', id);

    if (error) {
      return err(`Failed to update topic: ${error.message}`);
    }
    return ok(true);
  },
  deleteTopic: async (id: string): Promise<boolean> => {
    const supabase = await createClient();
    const { error } = await supabase.from('topic').delete().eq('id', id);

    if (error) {
      return false;
    }
    return true;
  },
  getUserTopics: async (userId: string): Promise<Topic[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('topic')
      .select(
        `
      id,
      owner_id,
      title,
      description,
      created_at,
      reasoning,
      objective (
        id,
        topic_id,
        title,
        description,
        reasoning
      )
    `,
      )
      .eq('owner_id', userId);

    if (error) {
      console.error('Error fetching user topics:', error);
      return [];
    }

    return (data ?? []).map(
      (item: any): Topic => ({
        id: item.id,
        ownerId: item.owner_id,
        title: item.title,
        description: item.description,
        createdAt: item.created_at,
        reasoning: item.reasoning,
        objectives: (item.objective || []).map(
          (obj: any): Objective => ({
            id: obj.id,
            topicId: obj.topic_id,
            title: obj.title,
            description: obj.description,
            reasoning: obj.reasoning,
            tasks: [], // left empty since not selected here
          }),
        ),
      }),
    );
  },

  // Learning Objectives
  createLearningObjective: async (
    objective: Objective,
  ): Promise<Result<Objective, string>> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('objective')
      .insert(objective)
      .single();

    if (error) {
      return err(`Failed to create learning objective: ${error.message}`);
    }
    return ok(data);
  },
  createManyLearningObjectives: async (
    objectives: Objective[],
  ): Promise<Result<Objective[], string>> => {
    const supabase = await createClient();
    console.log('Creating multiple learning objectives:', objectives);
    const { data, error } = await supabase.from('objective').insert(objectives);

    console.log('Created multiple learning objectives:', data, error);

    if (error) {
      return err(`Failed to create learning objectives: ${error.message}`);
    }
    return ok(data ?? []);
  },
  getLearningObjectiveById: async (id: string): Promise<Result<Objective, string>> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('objective')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return err(`Failed to retrieve learning objective: ${error.message}`);
    }
    return ok(data);
  },
};
