// 캐싱정책으로 문제가 되어서 전용으로 추가합니다.
// 이건 게시판 전용이니 캐시된 컴포넌트 외에는 쓰지 마세요!
// 게시판에 쓸 용도입니다.

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createStaticClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
