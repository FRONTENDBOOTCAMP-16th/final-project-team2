import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server' // 서버용 클라이언트 사용

export default async function MyPage() {
  const supabase = await createClient()

  // 현재 로그인한 유저 세션 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 로그인이 안 되어 있다면 로그인 페이지로 보냄
  if (!user) {
    redirect('/login')
  }

  // DB에서 실제 역할(role) 가져오기
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role // 'USER' | 'BUSINESS'

  // 역할에 따라 리다이렉트
  if (role === 'BUSINESS') {
    redirect('/mypage/seller/products')
  } else {
    redirect('/mypage/consumer/orders')
  }
}
