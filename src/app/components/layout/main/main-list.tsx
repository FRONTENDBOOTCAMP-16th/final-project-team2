import SwiperSection from "./swiper";

const swiperList = [
  { title: '신상품 추천', image: '/slide_bg_1.png'},
  { title: '베스트 상품', image: '/slide_bg_2.png'},
]

export default function Main() {
  return (
    <main className="w-full h-full min-h-full flex-1">
      <SwiperSection swiperList={swiperList} />
    </main>
  )
}