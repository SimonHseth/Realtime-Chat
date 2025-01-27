"use client"

import { Message } from "@/types";
import { useEffect, useState } from "react";
import { fetchMessages } from "./FetchMessage";
import { subscribeToMessages } from "./subscribe";
import { sendMessage } from "./SendMessage";



export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessages] = useState<string>("");
    const [userId] = useState<string>(() => `user_${Math.random().toString(36).substring(7)}`)
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage(newMessage, userId);
    setNewMessages("");
  };

    


    useEffect(() => {
        let isMounted = true;

        const loadMessages = async () => {
            const data = await fetchMessages();
            if (isMounted) {
                setMessages(data);
            }
        };

      

        loadMessages();

        const subscribe = async () => {
            const subscription = await subscribeToMessages((newMsg: Message) => {
                if (isMounted) {
                    setMessages((prevMessages) => [...prevMessages, newMsg]);
                }
            });

            return () => {
                if (subscription && typeof subscription.unsubscribe === 'function') {
                    subscription.unsubscribe();
                }
            };
        };

        const cleanup = subscribe();

        return () => {
            isMounted = false;
            cleanup.then((fn) => fn());
        };

        
    },[]);

   

    return (
        <div className="p-[20px] max-w-[600px] m-0-auto">
            <div className="max-h-[400px] overflow-y-auto border border-1 border-solid p-[10px]">
                {messages.map((msg) => (
                    <div key={msg.id} className="mt-[10px]">
                        <strong>{msg.user_id}:</strong> {msg.content}
                    </div>
                ))}

            </div>
        </div>
    )
}