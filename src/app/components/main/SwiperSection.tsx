'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import { LucideBadgePercent } from 'lucide-react'

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
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="[&_.swiper-button-next]:right-5! [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-white [&_.swiper-button-next]:p-3.5 [&_.swiper-button-next]:ps-4.5 [&_.swiper-button-next]:shadow-lg [&_.swiper-button-prev]:left-5! [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white [&_.swiper-button-prev]:p-3.5 [&_.swiper-button-prev]:pe-4.5 [&_.swiper-button-prev]:shadow-lg [&_.swiper-navigation-icon]:text-black [&_.swiper-pagination-bullet]:bg-white! [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-400 [&_.swiper-pagination-bullet-active]:w-16! [&_.swiper-pagination-bullet-active]:rounded-full! [&_.swiper-pagination-bullet-active]:bg-[#FF6B6B]! [&_.swiper-pagination-bullets]:bottom-10!"
    >
      {swiperList.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative aspect-video h-163 w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-30 inset-y-35 content-center text-right whitespace-pre-wrap">
              {item.tag && (
                <span className="center mbe-4 inline-flex rounded-4xl bg-[#FF6B6B] px-5.5 py-2 font-medium text-white">
                  <LucideBadgePercent className="me-2" />
                  {item.tag}
                </span>
              )}
              <strong className="block text-5xl/tight font-extrabold text-[#2D3142]">
                {item.title}
              </strong>
              {item.subText && (
                <p className="mbs-3 text-[#7B7979]">{item.subText}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
