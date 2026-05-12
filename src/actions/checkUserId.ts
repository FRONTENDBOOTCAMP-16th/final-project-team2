'use server'

import { createClient } from '@/utils/supabase/server'

export default async function checkUserID() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return { id: user.id, role: data.role }
}
