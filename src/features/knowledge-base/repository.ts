import { Topic } from "./types";
import { createClient } from "@/lib/supabase/client";
import { err, ok, Result } from "@/shared/types";

export interface KnowledgeBaseRepository {
    createTopic(topic: Topic): Promise<Topic>;
    getTopicById(id: string): Promise<Topic | null>;
    updateTopic(topic: Topic): Promise<Topic | null>;
    deleteTopic(id: string): Promise<boolean>;
    getUserTopics(userId: string): Promise<Topic[]>;
}

export const KnowledgeBaseRepository = {
    createTopic: async (topic: Topic) : Promise<Result<Topic, string>> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("topic")
            .insert(topic)
            .single();

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
    }

}
