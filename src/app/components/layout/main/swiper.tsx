'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

interface swiperProps {
  swiperList: {
    title: string
    image: string
  }[]
}

export default function SwiperSection({ swiperList }: swiperProps) {
  return (
    <>
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
        className="
          [&_.swiper-pagination-bullet]:bg-gray-300!
          [&_.swiper-pagination-bullet]:opacity-100!
          [&_.swiper-pagination-bullet]:transition-all
          [&_.swiper-pagination-bullet]:duration-400 
          
          [&_.swiper-pagination-bullet-active]:bg-blue-500!
          [&_.swiper-pagination-bullet-active]:w-8!
          [&_.swiper-pagination-bullet-active]:rounded-full!
        "
      >
        {swiperList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-80 aspect-video">
              <Image src={item.image} alt={item.title} fill className="object-cover" loading="eager"/>
              <div className="absolute inset-y-35 inset-x-20">
                <span className='text-4xl font-bold text-gray-600'>{item.title}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}