"use server";

import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerClient = async (
  supabaseUrl: string,
  supabaseKey: string,
  options: { 
    cookies: {
      get(name: string): string | undefined
      set(name: string, value: string, options: CookieOptions): void
      remove(name: string, options: CookieOptions): void
    }
  }
) => {
  return _createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: options.cookies,
      cookieOptions: {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  )
}

export const supabaseServer = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', { ...options, maxAge: -1 })
        }
      }
    }
  )
}

