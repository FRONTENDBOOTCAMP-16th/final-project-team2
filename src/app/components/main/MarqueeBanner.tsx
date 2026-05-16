'use client'

import { Sparkles } from 'lucide-react'

const promoTexts = [
  '신규 가입 시 5,000원 쿠폰 증정',
  '오늘의 특가 최대 50% 할인',
  '5만원 이상 구매 시 무료배송',
  '매일 오후 2시 타임세일',
  '리뷰 작성 시 포인트 적립',
]

export default function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-secondary py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...promoTexts, ...promoTexts].map((text, index) => (
          <span key={index} className="flex items-center mx-8 text-white font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
