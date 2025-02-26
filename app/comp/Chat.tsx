"use client"

import { Message } from "types";
import { useEffect, useState } from "react";
import { fetchMessages } from "./FetchMessage"; // Import sendMessage function
import sendMessage from "../api/SendMessage";
import { subscribeToMessages } from "./subscribe";
import ChatInput from "./InputField";

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessages] = useState<string>("");
    const [userId] = useState<string>(() => `user_${Math.random().toString(36).substring(7)}`);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: Message = {
            id: Math.random().toString(36).substring(7),
            user_id: userId,
            content: newMessage,
            created_at: new Date().toISOString(),
            timestamp: new Date().toISOString(),
        };

        await sendMessage(message); // Send the message
        setMessages((prevMessages) => [...prevMessages, message]); // Update the state with the new message
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
    }, []);

    return (
        <div className="p-[20px] max-w-[600px] m-0-auto">
            <div className="h-[500px] w-[720px] overflow-y-auto border border-1 border-dotted p-[10px]">
                {messages.map((msg) => (
                    <div key={msg.id} className="mt-[10px] w-full h-fit-content p-[2px] rounded">
                        <strong>{msg.user_id}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="w-full h-20 bottom-full flex">
                <ChatInput onSendMessage={handleSendMessage} newMessage={newMessage} setNewMessages={setNewMessages} />
            </div>
        </div>
    );
}