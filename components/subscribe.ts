

import { supabaseServer } from "@/lib/supabase/server";
import { Message } from "@/types";

const supabase = await supabaseServer()

export const subscribeToMessages = (
    
    onNewMessage: (newMessage: Message) => void
): ReturnType<typeof supabase.channel> => {
    return supabase
    .channel("realtime:messages")
    .on<Message>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
            onNewMessage(payload.new);
        }
    )
    .subscribe();
};