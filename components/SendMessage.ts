"use server"

import { supabaseServer } from "@/lib/supabase/server"

export const sendMessage = async (content: string, userId: string): Promise<void> => {
    const supabase = await supabaseServer()
    const { error } = await supabase
        .from("messages")
        .insert([{ content, user_Id: userId }]);

    if (error) {
        console.error("Error sending message", error);
    }
};