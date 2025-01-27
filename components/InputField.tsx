import { FormEvent, useState } from "react";
import { sendMessage } from "./SendMessage";



export const ChatInput = () => {
     const [newMessage ] = useState<string>("");
    function handleSendMessage(event: FormEvent<HTMLFormElement>): void {
        sendMessage;
    }

    function setNewMessages(value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="w-full h-full flex items-center justify overflow-hidden">
             <form onSubmit={handleSendMessage} className="mt-[10px] text-black bg-primary border border-solid rounded-md mr-0">
                <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessages(e.target.value)}
                placeholder="Skrive her..." 
                className="w-[400px] h-12 p-[10] text-black bg-primary "
                />
                <button type="submit" className="p-[10px] ml-5 mt-0 border text-white bg-green-700 h-full w-15 m-auto">Send</button>

            </form>
        
        </div>
    )
}

export default ChatInput;