"use client"

import React from "react";

interface ChatInputProps {
    onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    newMessage: string;
    setNewMessages: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, newMessage, setNewMessages }) => {
    return (
        <form onSubmit={onSendMessage} className="flex w-full">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessages(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
                placeholder="Type your message..."
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                Send
            </button>
        </form>
    );
};

export default ChatInput;
