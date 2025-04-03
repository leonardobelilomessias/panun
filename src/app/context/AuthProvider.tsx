// components/auth-provider.tsx
'use client'

import { supabaseClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => { 
    const { data: { subscription } } = supabaseClient().auth.onAuthStateChange(async (event) => {
        console.log(event,'subscriptiom em dashboar ')

      if (event === 'SIGNED_OUT') {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      }
      
      if (event === 'TOKEN_REFRESHED') {
        router.refresh()
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router, pathname])

  return <>{children}</>
}