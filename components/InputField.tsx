"use client"

import { useState } from "react";

export const ChatInput = () => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [userId] = useState<string>("example-user-id"); // Replace with actual user ID logic

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!newMessage.trim()) {
            console.error("Cannot send an empty message.");
            return;
        }

        try {
            const response = await fetch("pages/api/SendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newMessage, userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error sending message:", errorData.error);
                return;
            }
            const data = await response.json();
            console.log("Message sent successfully", data);
            setNewMessage(""); 
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <form
                onSubmit={handleSendMessage}
                className="mt-[10px] text-black bg-primary border border-solid rounded-md mr-0"
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type here..."
                    className="w-[400px] h-12 p-[10] text-white bg-primary"
                />
                <button
                    type="submit"
                    className="p-[10px] ml-5 mt-0 border text-white bg-green-700 h-full w-15 m-auto"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
