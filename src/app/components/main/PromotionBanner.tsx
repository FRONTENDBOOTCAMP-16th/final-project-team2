'use client'

import { Gift, Truck, Shield, Clock } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const benefits = [
  { icon: Truck, text: '무료배송', subText: '5만원 이상 구매 시' },
  { icon: Gift, text: '신규회원 혜택', subText: '5,000원 쿠폰 증정' },
  { icon: Shield, text: '안전결제', subText: '100% 안전 보장' },
  { icon: Clock, text: '빠른배송', subText: '오후 2시 전 주문 시' },
]

export default function PromotionBanner() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div 
      ref={ref}
      className="bg-gradient-to-r from-primary-light via-secondary-light to-accent-light py-8 my-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-4 rounded-2xl bg-card/80 backdrop-blur-sm shadow-sm 
                transition-all duration-500 hover:shadow-lg hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 category-icon">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="font-bold text-foreground">{benefit.text}</p>
              <p className="text-sm text-muted-foreground mt-1">{benefit.subText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
