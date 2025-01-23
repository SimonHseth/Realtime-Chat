import Chat from "@/components/Chat";
import ChatHeader from "@/components/ChatHeader";
import InputField from "@/components/InputField"

export default async function Home() {
  return (
    <div className="bg-primary">
      <main className="max-w-3xl mx-auto md:py-10 h-screen text-white">
        <div className="h-full border rounded-md ">
          <ChatHeader/>
          <div className="w-full h-15 border-t">
            <Chat/>

          </div>
          
        </div>
      </main>
    </div>
  );
}
