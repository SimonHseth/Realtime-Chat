import ChatHeader from "@/components/ChatHeader";
import { createServerClient } from '@/lib/supabase/server';
import { cookies } from "next/headers";

export async function Countries() {
  const supabase = await createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: () => cookies()
    }
  );
  const { data: countries } = await supabase.from("countries").select();

  return <pre>{JSON.stringify(countries, null, 2)}</pre>
}

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
