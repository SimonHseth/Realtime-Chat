import { FormEvent, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";


export const ChatInput = () => {
     const [newMessage ] = useState<string>("");
    function handleSendMessage(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    function setNewMessages(value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="w-full h-full flex items-center justify overflow-hidden">
             <form onSubmit={handleSendMessage} className="mt-[10px] text-black">
                <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessages(e.target.value)}
                placeholder="Skrive her..."
                className="w-80% p-[10]"
                />
                <button type="submit" className="p-[10px] ml-[10px]"><IoArrowForwardCircleOutline /></button>

            </form>/
        
        </div>
    )
}

export default ChatInput;