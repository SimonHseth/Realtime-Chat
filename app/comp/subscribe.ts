import { supabaseServer } from "@/lib/supabase/server";
import { Message } from "@/types";

export const subscribeToMessages = async (
    onNewMessage: (newMessage: Message) => void
): Promise<ReturnType<typeof supabase.channel>> => {
    const supabase = await supabaseServer();

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