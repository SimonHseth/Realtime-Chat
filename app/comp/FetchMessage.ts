"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { Message } from "types";

export const fetchMessages = async (): Promise<Message[]> => {
    const supabase = await supabaseServer()
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching messages", error);
        return [];
    }
    return data as Message[];
};
