import { createClient } from '@/utils/supabase/server'
import type { BoardCard } from '@/types/boards'

export const getNoticeDetail = async (id: string): Promise<BoardCard> => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}