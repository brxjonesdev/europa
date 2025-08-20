import { Result, ok, err } from "@/shared/types";
import { LearningObjective, Topic } from "./types";
import { KnowledgeBaseRepository } from "./repository";
import { keysToSnake } from "@/shared/util";


export const addTopic = async (topic: Topic): Promise<Result<Topic, string>> => {
    console.log("Adding topic:", keysToSnake(topic));
    const response = await KnowledgeBaseRepository.createTopic(keysToSnake(topic));
    // Add pre-checks and error handling.
    if (response.ok) {
        return ok(response.data);
    }
    return err(response.error ?? "Failed to create topic");
};

export const updateTopic = async (topic: Topic): Promise<Result<Topic, string>> => {
    const response = await KnowledgeBaseRepository.updateTopic(topic);
    if (response) {
        return ok(response);
    }
    return err("Failed to update topic");
};

export const getTopicById = async (id: string) => {
    const response = await KnowledgeBaseRepository.getTopicById(id);
    if (response) {
        return ok(response);
    }
    return err("Failed to retrieve topic");
};

export const getUserTopics = async (userId: string) : Promise<Result<Topic[], string>> => {
    const response = await KnowledgeBaseRepository.getUserTopics(userId);
    if (response) {
        return ok(response);
    }
    return err("Failed to retrieve user topics");
};

// Objectives

export const addLearningObjective = async (objectives: LearningObjective | LearningObjective[]): Promise<Result<LearningObjective | LearningObjective[], string>> => {
    if (Array.isArray(objectives)) {
        const response = await KnowledgeBaseRepository.createManyLearningObjectives(keysToSnake(objectives));
        if (response.ok) {
            return ok(response.data);
        }
        return err(response.error ?? "Failed to create learning objectives");
    }
    const response = await KnowledgeBaseRepository.createLearningObjective(keysToSnake(objectives));
    if (response.ok) {
        return ok(response.data);
    }
    return err(response.error ?? "Failed to create learning objective");
};