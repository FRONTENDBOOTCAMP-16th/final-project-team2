import ProductMDList from "../../ProductsCardMDList";
import SwiperSection from "./swiper";


const swiperList = [
  { title: '신상품 추천', image: '/slide_bg_1.png'},
  { title: '베스트 상품', image: '/slide_bg_2.png'},
]

export default function Main() {
  return (
    <main className="w-full h-full min-h-full flex-1">
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* MD 추천 상품 */}
      <div className="p-20">
        <h2 className="text-center text-4xl font-bold">MD 추천 상품</h2>
        <p className="text-center text-gray-600 pbs-3 pb-12">이번주 인기상품을 확인해보세요</p>

        <ProductMDList />
      </div>
    </main>
  )
}