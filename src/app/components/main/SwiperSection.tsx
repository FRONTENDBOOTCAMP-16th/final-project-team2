'use client'

import { LucideBadgePercent, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface swiperProps {
  swiperList: {
    title: string
    subText?: string
    tag?: string
    image: string
  }[]
  srTitle: string
  srSubtitle: string
}

export default function SwiperList({
  swiperList,
  srTitle,
  srSubtitle,
}: swiperProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isPlay, setIsPlay] = useState(true)

  const togglePlay = () => {
    if (!swiperRef.current) return

    if (isPlay) {
      swiperRef.current.autoplay.stop()
    } else {
      swiperRef.current.autoplay.start()
    }

    setIsPlay(!isPlay)
  }

  return (
    <section className="relative">
      <h2 className="sr-only">{srTitle}</h2>
      <p className="sr-only">{srSubtitle}</p>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Navigation, Autoplay, Pagination, A11y]}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        a11y={{
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          paginationBulletMessage: `{{index}}번째 슬라이드로 이동`,
        }}
        className="[&_.swiper-button-next]:right-5! [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-white [&_.swiper-button-next]:p-3.5 [&_.swiper-button-next]:ps-4.5 [&_.swiper-button-next]:shadow-lg [&_.swiper-button-prev]:left-5! [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white [&_.swiper-button-prev]:p-3.5 [&_.swiper-button-prev]:pe-4.5 [&_.swiper-button-prev]:shadow-lg [&_.swiper-navigation-icon]:text-black [&_.swiper-pagination-bullet]:bg-white! [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-400 [&_.swiper-pagination-bullet-active]:w-16! [&_.swiper-pagination-bullet-active]:rounded-full! [&_.swiper-pagination-bullet-active]:bg-black! [&_.swiper-pagination-bullets]:bottom-10!"
      >
        {swiperList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video h-163 w-full">
              <Image
                src={item.image}
                alt={''}
                fill
                className="object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-30 inset-y-35 content-center text-right whitespace-pre-wrap">
                {item.tag && (
                  <span className="center mbe-4 inline-flex rounded-4xl bg-black px-5.5 py-2 font-medium text-white">
                    <LucideBadgePercent className="me-2" />
                    {item.tag}
                  </span>
                )}
                <strong className="block text-5xl/tight font-extrabold text-[#2D3142] dark:text-white">
                  {item.title}
                </strong>
                {item.subText && (
                  <p className="mbs-3 text-[#7B7979] dark:text-white">
                    {item.subText}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-10 left-1/2 z-4 flex -translate-1/2 items-center justify-center">
          <button className="custom-pagination gap-1.2 flex items-center"></button>
          <button
            onClick={togglePlay}
            className="transition-hover ms-4 flex items-center justify-center rounded-full bg-black p-1 text-white backdrop-blur-sm hover:bg-black/60"
            aria-label={isPlay ? '슬라이드 정지' : '슬라이드 재생'}
          >
            {isPlay ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
        </div>
      </Swiper>
    </section>
  )
}
