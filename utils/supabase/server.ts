import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async (keepLogin: boolean = false) => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // 로그인 유지 조건 추가
              if (!keepLogin) {
                delete options.maxAge;
              }
              cookieStore.set(name, value, options)
            })
          } catch {
            // 서버 컴포넌트에서 호출될 경우 set이 실패할 수 있으나, 
            // 미들웨어에서 이를 대신 처리하므로 무시해도 안전합니다.
          }
        },
      },
    }
  )
}