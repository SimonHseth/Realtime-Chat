import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Messagehandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { content, userId } = req.body;

    if (!content || !userId) {
        return res.status(400).json({ error: "Missing required fields: content or userId" });
    }

    console.log("Recieved data:", {content, userId});

    try {
        const supabase = await supabaseServer();
        const { error } = await supabase
            .from("messages")
            .insert([{ content, user_id: userId }]);

        if (error) {
            throw error;
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
