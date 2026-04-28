import { createClient } from '../../utils/supabase/server'
import type { Notice } from '@/types/notice'

export const getNoticeDetail = async (id: string): Promise<Notice> => {
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