import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { Message } from "@/types";

export default async function sendMessage(message: Message) {
    const { user_id, content } = message;
    const userId = user_id;
    

    try {
        const supabase = await supabaseServer();
        const { error } = await supabase
            .from("messages")
            .insert([{ content, user_id: userId }]);

        if (error) {
            throw error;
        }

        
    } catch (error) {
        console.error("Error sending message:", error);
    }
}
