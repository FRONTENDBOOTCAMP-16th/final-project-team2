import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role

  if (role === 'BUSINESS') {
    redirect('/mypage/seller/products') // 판매자 첫 메뉴
  } else {
    redirect('/mypage/consumer/orders') // 소비자 첫 메뉴
  }

  // 리다이렉트 중에는 아무것도 보여주지 않도록 null 반환
  return null
}
