"use server";

import { CookieOptions, createServerClient as _createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerClient = async (
  supabaseUrl: string,
  supabaseKey: string,
  options: { cookies: any }
) => {
  return _createServerClient(supabaseUrl, supabaseKey, options)
}

export const supabaseServer = async () => {
  const cookieStore = await cookies();

  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name:string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', { ...options, maxAge: -1 })
        }
      },
    }
  )
}

