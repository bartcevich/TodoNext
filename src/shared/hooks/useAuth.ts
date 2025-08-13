'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(required = true) {
  const router = useRouter()

  useEffect(() => {
    const authToken = document.cookie.includes('authToken=')
    
    if (required && !authToken) {
      router.push('/auth/login')
    }
    
    if (!required && authToken) {
      router.push('/main/tasks')
    }
  }, [required, router])
}