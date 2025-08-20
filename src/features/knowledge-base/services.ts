import { Result, ok, err } from "@/shared/types";
import { Topic } from "./types";
import { KnowledgeBaseRepository } from "./repository";


export const addTopic = async (topic: Topic): Promise<Result<Topic, string>> => {
    const response = await KnowledgeBaseRepository.createTopic(topic);
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

export const getUserTopics = async (userId: string) => {
    const response = await KnowledgeBaseRepository.getUserTopics(userId);
    if (response) {
        return ok(response);
    }
    return err("Failed to retrieve user topics");
};
