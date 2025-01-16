import ChatHeader from "@/components/ChatHeader";

export default async function Home() {
  return (
    <div className="bg-primary">
      <main className="max-w-3xl mx-auto md:py-10 h-screen text-white bg-primary">
        <div className="h-full border rounded-md">
          <ChatHeader/>
        </div>
      </main>
    </div>
  );
}
