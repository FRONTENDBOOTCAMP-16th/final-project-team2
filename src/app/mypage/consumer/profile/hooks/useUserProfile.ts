import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ConsumerInfoData } from '@/app/mypage/types/infoSchema'

const supabase = createClient()

interface UseUserProfileProps {
  user: { id: string } | null
  setFormData: (data: ConsumerInfoData) => void
}

export const useUserProfile = ({ user, setFormData }: UseUserProfileProps) => {
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return

      const { data, error } = await supabase
        .from('users')
        .select(
          'email, name, nickname, phone, address, birthday, profile_image',
        )
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('데이터를 불러오지 못했습니다:', error.message)
        return
      }

      if (data) {
        // DB 컬럼명을 스키마 구조에 맞게 매핑하여 setFormData에 전달합니다
        setFormData({
          profileImage: data.profile_image || '',
          name: data.name || '',
          email: data.email || '',
          nickname: data.nickname || '',
          phone: data.phone || '',
          address: data.address || '',
          birthday: data.birthday || null,
        })
      }
    }
    fetchUserData()
  }, [user?.id, setFormData])

  const saveUserProfile = async (data: ConsumerInfoData) => {
    if (!user?.id) throw new Error('유저 정보가 없습니다.')

    const { error } = await supabase
      .from('users')
      .update({
        nickname: data.nickname,
        phone: data.phone,
        address: data.address,
        profile_image: data.profileImage,
        birthday: data.birthday,
      })
      .eq('id', user.id)

    if (error) throw error
    // 현재는 시간 관계상 저장 성공 후 데이터 반영을 위해 전체 페이지를 새로고침합니다.
    // 리팩토링이 진행된다면 tanstack query를 도입한 로직으로 변경할 예정입니다.
    window.location.reload()
  }

  return { saveUserProfile }
}
