import { LearningObjective, Topic } from "./types";
import { createClient } from "@/lib/supabase/client";
import { err, ok, Result } from "@/shared/types";
import { create } from "domain";

export interface KnowledgeBaseRepository {
    // Topics
    createTopic(topic: Topic): Promise<Topic>;
    getTopicById(id: string): Promise<Topic | null>;
    updateTopic(topic: Topic): Promise<Topic | null>;
    deleteTopic(id: string): Promise<boolean>;
    getUserTopics(userId: string): Promise<Topic[]>;

    // Learning Objectives
    createLearningObjective(objective: LearningObjective): Promise<LearningObjective>;
    createManyLearningObjectives(objectives: LearningObjective[]): Promise<LearningObjective[]>;
    getLearningObjectiveById(id: string): Promise<LearningObjective | null>;
    updateLearningObjective(objective: LearningObjective): Promise<LearningObjective | null>;
    deleteLearningObjective(id: string): Promise<boolean>;
    getLearningObjectivesByTopicId(topicId: string): Promise<LearningObjective[]>;
}

export const KnowledgeBaseRepository = {
    createTopic: async (topic: Topic) : Promise<Result<Topic, string>> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("topic")
            .insert(topic)
            .single();

            console.log(data, error, "boos");

        if (error) {
            return err(`Failed to create topic: ${error.message}`);
        }
        return ok(data);
    },
    getTopicById: async (id: string): Promise<Topic | null> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("topic")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return null;
        }
        return data;
    },
    updateTopic: async (topic: Topic): Promise<Topic | null> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("topic")
            .update(topic)
            .eq("id", topic.id)
            .single();

        if (error) {
            return null;
        }
        return data;
    },
    deleteTopic: async (id: string): Promise<boolean> => {
        const supabase = await createClient();
        const { error } = await supabase
            .from("topic")
            .delete()
            .eq("id", id);

        if (error) {
            return false;
        }
        return true;
    },
    getUserTopics: async (userId: string): Promise<Topic[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("topic")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            return [];
        }
        return data;
    },

    // Learning Objectives
    createLearningObjective: async (objective: LearningObjective): Promise<Result<LearningObjective, string>> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("objective")
            .insert(objective)
            .single();

        if (error) {
            return err(`Failed to create learning objective: ${error.message}`);
        }
        return ok(data);
    },
    createManyLearningObjectives: async (objectives: LearningObjective[]): Promise<Result<LearningObjective[], string>> => {
        const supabase = await createClient();
        console.log("Creating multiple learning objectives:", objectives);
        const { data, error } = await supabase
            .from("objective")
            .insert(objectives);

        console.log("Created multiple learning objectives:", data, error);

        if (error) {
            return err(`Failed to create learning objectives: ${error.message}`);
        }
        return ok(data ?? []);
    }

}
