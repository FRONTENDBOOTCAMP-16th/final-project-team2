import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { UserCouponCombined } from '@/app/mypage/types/coupon'

export const useUserCoupons = (userId: string | undefined) => {
  const [coupons, setCoupons] = useState<UserCouponCombined[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const supabase = createClient()

        // user_coupons 테이블에서 내 쿠폰을 가져오되,
        // 관계된 coupons 테이블의 상세 정보도 함께 가져옵니다 (Join)
        const { data, error } = await supabase
          .from('user_coupons')
          .select(
            `
            id,
            user_id,
            is_used,
            coupon_details:coupons (
              id,
              name,
              discount_rate,
              expired_at
            )
          `,
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setCoupons((data as unknown as UserCouponCombined[]) ?? [])
      } catch (err) {
        console.error('쿠폰 로딩 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoupons()
  }, [userId])

  return { coupons, isLoading }
}
