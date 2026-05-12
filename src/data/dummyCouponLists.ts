import { UserCouponCombined } from '@/app/mypage/types/coupon'

export const dummyUserCoupons: UserCouponCombined[] = [
  {
    id: 'uc-1',
    user_id: 'user-kim',
    coupon_id: 'cp-1',
    is_used: false,
    used_at: null,
    created_at: '2026-05-01T10:00:00Z',
    coupon_details: {
      id: 'cp-1',
      name: '신규 가입 축하 쿠폰',
      discount_rate: 10, // 10%
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-12-31T23:59:59Z',
    },
  },
  {
    id: 'uc-2',
    user_id: 'user-kim',
    coupon_id: 'cp-2',
    is_used: false,
    used_at: null,
    created_at: '2026-05-02T11:00:00Z',
    coupon_details: {
      id: 'cp-2',
      name: '첫 구매 감사 쿠폰',
      discount_rate: 5000, // 5,000원
      start_at: '2026-05-02T00:00:00Z',
      expired_at: '2026-06-30T23:59:59Z',
    },
  },
  {
    id: 'uc-3',
    user_id: 'user-kim',
    coupon_id: 'cp-3',
    is_used: true,
    used_at: '2026-05-03T15:00:00Z',
    created_at: '2026-05-01T10:00:00Z',
    coupon_details: {
      id: 'cp-3',
      name: '가정의 달 깜짝 쿠폰',
      discount_rate: 15, // 15%
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-05-31T23:59:59Z',
    },
  },
  {
    id: 'uc-4',
    user_id: 'user-kim',
    coupon_id: 'cp-4',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T09:00:00Z',
    coupon_details: {
      id: 'cp-4',
      name: '스승의 날 감사 쿠폰',
      discount_rate: 3000, // 3,000원
      start_at: '2026-05-15T00:00:00Z',
      expired_at: '2026-05-20T23:59:59Z',
    },
  },
  {
    id: 'uc-5',
    user_id: 'user-kim',
    coupon_id: 'cp-5',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T10:30:00Z',
    coupon_details: {
      id: 'cp-5',
      name: '장바구니 구제 쿠폰',
      discount_rate: 20, // 20%
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-05-10T23:59:59Z',
    },
  },
  {
    id: 'uc-6',
    user_id: 'user-kim',
    coupon_id: 'cp-6',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T12:00:00Z',
    coupon_details: {
      id: 'cp-6',
      name: '주말 브런치 특별 쿠폰',
      discount_rate: 2000, // 2,000원
      start_at: '2026-05-09T00:00:00Z',
      expired_at: '2026-05-11T23:59:59Z',
    },
  },
  {
    id: 'uc-7',
    user_id: 'user-kim',
    coupon_id: 'cp-7',
    is_used: true,
    used_at: '2026-04-30T18:00:00Z',
    created_at: '2026-04-20T10:00:00Z',
    coupon_details: {
      id: 'cp-7',
      name: '컴백 환영 웰컴백 쿠폰',
      discount_rate: 30, // 30%
      start_at: '2026-04-20T00:00:00Z',
      expired_at: '2026-05-20T23:59:59Z',
    },
  },
  {
    id: 'uc-8',
    user_id: 'user-kim',
    coupon_id: 'cp-8',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T14:00:00Z',
    coupon_details: {
      id: 'cp-8',
      name: '문구류 카테고리 할인',
      discount_rate: 1000, // 1,000원
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-05-31T23:59:59Z',
    },
  },
  {
    id: 'uc-9',
    user_id: 'user-kim',
    coupon_id: 'cp-9',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T15:00:00Z',
    coupon_details: {
      id: 'cp-9',
      name: '생일 축하해용 쿠폰',
      discount_rate: 50, // 50%
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-05-31T23:59:59Z',
    },
  },
  {
    id: 'uc-10',
    user_id: 'user-kim',
    coupon_id: 'cp-10',
    is_used: false,
    used_at: null,
    created_at: '2026-05-04T16:00:00Z',
    coupon_details: {
      id: 'cp-10',
      name: '앱 설치 감사 쿠폰',
      discount_rate: 10000, // 10,000원
      start_at: '2026-05-01T00:00:00Z',
      expired_at: '2026-12-31T23:59:59Z',
    },
  },
]
