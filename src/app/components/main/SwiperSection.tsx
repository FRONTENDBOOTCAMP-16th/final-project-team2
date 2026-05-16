'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { LucideBadgePercent, ArrowRight } from 'lucide-react'

interface swiperProps {
  swiperList: {
    title: string
    subText?: string
    tag?: string
    image: string
  }[]
}

export default function SwiperList({ swiperList }: swiperProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="[&_.swiper-button-next]:right-8! [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-card/90 [&_.swiper-button-next]:p-4 [&_.swiper-button-next]:ps-5 [&_.swiper-button-next]:shadow-xl [&_.swiper-button-next]:backdrop-blur-sm [&_.swiper-button-next]:hover:bg-card [&_.swiper-button-next]:hover:scale-110 [&_.swiper-button-next]:transition-all [&_.swiper-button-prev]:left-8! [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-card/90 [&_.swiper-button-prev]:p-4 [&_.swiper-button-prev]:pe-5 [&_.swiper-button-prev]:shadow-xl [&_.swiper-button-prev]:backdrop-blur-sm [&_.swiper-button-prev]:hover:bg-card [&_.swiper-button-prev]:hover:scale-110 [&_.swiper-button-prev]:transition-all [&_.swiper-navigation-icon]:text-primary-dark [&_.swiper-pagination-bullet]:bg-white! [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-400 [&_.swiper-pagination-bullet]:w-3! [&_.swiper-pagination-bullet]:h-3! [&_.swiper-pagination-bullet-active]:w-10! [&_.swiper-pagination-bullet-active]:rounded-full! [&_.swiper-pagination-bullet-active]:bg-primary! [&_.swiper-pagination-bullets]:bottom-8!"
      >
        {swiperList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video h-163 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover scale-105 transition-transform duration-[8000ms] ease-out group-data-[swiper-slide-active]:scale-100"
                loading="eager"
              />
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-8 md:px-16">
                  <div className="max-w-xl animate-slide-up">
                    {item.tag && (
                      <span className="inline-flex items-center rounded-full bg-primary px-5 py-2 font-semibold text-white shadow-lg mb-6 animate-bounce-soft">
                        <LucideBadgePercent className="mr-2 w-5 h-5" />
                        {item.tag}
                      </span>
                    )}
                    <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight whitespace-pre-wrap drop-shadow-sm">
                      {item.title}
                    </h2>
                    {item.subText && (
                      <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">{item.subText}</p>
                    )}
                    <Link 
                      href="/products/pens" 
                      className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:gap-4 btn-shine"
                    >
                      쇼핑하러 가기
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 장식 요소 */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
    </div>
  )
}
