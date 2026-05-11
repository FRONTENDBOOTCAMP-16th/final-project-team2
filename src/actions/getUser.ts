// @/actions/auth.ts
'use server'

import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * 유저의 권한 정보만 가져오는 함수 (목록 페이지용)
 * 에러 발생 시 리다이렉트 하지 않고 null을 반환하여 안전함
 */
export async function getAuthUserInfo() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: userData } = await supabase
      .from('users')
      .select('role, nickname, id')
      .eq('id', user.id)
      .single()

    return { user, role: userData?.role, nickname: userData?.nickname, id: userData?.id }
  } catch (e) {
    return null
  }
}

/**
 * 관리자 권한을 강제로 체크하는 함수 (작성 페이지/서버 액션용)
 * 관리자가 아니면 즉시 리다이렉트 시킴
 */
export async function validateAdmin(fallbackPath: string = '/notice') {
  const auth = await getAuthUserInfo()

  if (!auth || auth.role !== 'ADMIN') {
    redirect(fallbackPath)
  }

  return auth
}