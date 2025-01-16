'use client'

import { Button } from "./ui/button"
import { createClient } from '@/lib/supabase/browser'

export default function LoginButton() {
  const handleLoginWithGithub = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div>
      <Button onClick={handleLoginWithGithub} className="border">
       Login with Github
      </Button>
      <Button>
        Login
      </Button>
    </div>
   
  )

  console.log(LoginButton)
} 
