'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function checkAdmin(fallbackPath: string = '/notice') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(fallbackPath)
  }

  const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('role, nickname')
    .eq('id', user.id)
    .single()

  if (dbError || !userData || userData.role !== "ADMIN") {
    redirect(fallbackPath)
  }

  return { user, userData }
}