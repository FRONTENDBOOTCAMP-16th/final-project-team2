import Image from "next/image"
import SwiperSection from "./SwiperSection"
import ProductsRecommendationList from "./ProductsRecommendationList"
import ProductsCard from "./ProductsCard"
import products from '@/data/dummyproducts.json'
import newProducts from '@/data/dummyNewProducts.json'
import ProductsCardList from "./ProductsCardList"
import ProductTodayList from "./ProductsToday"
import ProductsTodaySale from "./ProductsTodaySale"
import MainCardList from "./MainCardList"

const INVENTORY_PRODUCTS = 4
const DISCOUNT_PRODUCTS = 2
const MD_PRODUCTS = 4

const swiperList = [
  { title: '새학기 준비,\n행쇼마켓에서!', subText: '필기구부터 노트까지, 특가로 만나보세요', tag: 'SPRING SALE', image: '/Hero_banner.png'},
  { title: '행쇼마켓\n특가 할인', subText: '12:00 ~ 18:00까지!', tag: 'TIME SALE', image: '/Hero_banner.png'},
  { title: '품절 임박 꿀템,\n놓치지 마세요', image: '/Hero_banner.png'},
]

const todaySaleList =[
  { id:'1', category:'만년필', name: '멋쟁이 만년필', discount_rate: 35, price: 24000, thunmbnail_image: '/today_sale.png' },
  { id:'2', category:'만년필', name: '멋쟁이 만년필', discount_rate: 26, price: 26000, thunmbnail_image: '/today_sale.png' },
  { id:'3', category:'만년필', name: '멋쟁이 만년필', discount_rate: 40, price: 26000, thunmbnail_image: '/today_sale.png' },
]

const sortedSaleList = todaySaleList.toSorted((a, b) => {
  return b.discount_rate - a.discount_rate
})


export default function Main() {
  return (
    <>
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* 오늘의 특가 */}
      <section className="bg-[#FFF8F3]">
        <div className="py-25 px-4 text-center max-w-7xl m-auto ">
          <h2 className="text-5xl font-bold font-4">오늘의 특가</h2>
          <p className="text-[#7B7979] mbs-5 mb-12.5">오늘만 이 가격! 특별한 가격을 확인해보세요</p>

          <MainCardList className="grid lg:grid-cols-2 gap-6">
            <ProductsTodaySale maxProducts={DISCOUNT_PRODUCTS} products={sortedSaleList} />
          </MainCardList>
        </div>
      </section>

      {/* MD 추천 상품 */}
      <section className="mbs-23 px-10 max-w-7xl m-auto">
        <h2 className="text-center text-4xl font-bold">MD 추천 상품</h2>
        <p className="text-center text-gray-600 pbs-3 pb-12">이번주 인기상품을 확인해보세요</p>

        <ProductsCardList>
          <ProductsCard maxProducts={MD_PRODUCTS} products={products} />
        </ProductsCardList>
      </section>

      {/* 오늘의 신상품 */}
      <section className="mbs-50 relative w-full h-126 min-h-250px sm:min-h-300px flex flex-col justify-center px-6 sm:px-12 overflow-hidden">
        <ProductTodayList products={newProducts} image="/new_product_bg.png"/>
      </section>

      {/* 품절 임박 꿀템 */}
      <section className="mbs-23 px-10 pbe-40 max-w-7xl m-auto">
        <h2 className="text-4xl flex gap-4 font-bold">
          <Image
            src ={'/icon_cart.png'}
            alt=""
            width={40}
            height={40}
            loading="eager"
          />
          품절 임박 꿀템
        </h2>
        <p className="text-gray-600 ps-14 pbs-3 pb-12">서두르세요! 재고가 얼마 남지 않았어요</p>

        <ProductsRecommendationList className="flex [&>li]:border [&>li]:p-4 gap-4 justify-center">
          <ProductsCard maxProducts={INVENTORY_PRODUCTS} products={products} hasLike/>
        </ProductsRecommendationList>
      </section>
    </>
  )
}
