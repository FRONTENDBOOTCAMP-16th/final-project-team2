import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { SellerInfoData } from '@/app/mypage/types/infoSchema'

const supabase = createClient()

// user 객체의 구조와 setFormData 함수의 타입을 정의합니다.
interface UseSellerProfileProps {
  user: { id: string } | null
  setFormData: React.Dispatch<React.SetStateAction<SellerInfoData>>
}

export const useSellerProfile = ({
  user,
  setFormData,
}: UseSellerProfileProps) => {
  useEffect(() => {
    const fetchSellerData = async () => {
      if (!user?.id) return

      const { data: userData } = await supabase
        .from('users')
        .select('email, phone')
        .eq('id', user.id)
        .single()

      const { data: storeData } = await supabase
        .from('stores')
        .select('name, location, intro, profile_image')
        .eq('owner_id', user.id)
        .single()

      if (userData || storeData) {
        setFormData({
          email: userData?.email || '',
          name: storeData?.name || '',
          phone: userData?.phone || '',
          location: storeData?.location || '',
          intro: storeData?.intro || '',
          profileImage: storeData?.profile_image || '',
        })
      }
    }
    fetchSellerData()
  }, [user?.id, setFormData])

  const saveProfile = async (data: SellerInfoData) => {
    if (!user?.id) throw new Error('유저 정보가 없습니다.')

    const { error: userError } = await supabase
      .from('users')
      .update({ phone: data.phone })
      .eq('id', user.id)
    if (userError) throw userError

    const { error: storeError } = await supabase.from('stores').upsert(
      {
        owner_id: user.id,
        name: data.name,
        location: data.location,
        intro: data.intro,
        profile_image: data.profileImage,
      },
      { onConflict: 'owner_id' },
    )
    if (storeError) throw storeError
    // 현재는 시간 관계상 저장 성공 후 데이터 반영을 위해 전체 페이지를 새로고침합니다.
    // 리팩토링이 진행된다면 tanstack query를 도입한 로직으로 변경할 예정입니다.
    window.location.reload()
  }
  return { saveProfile }
}
