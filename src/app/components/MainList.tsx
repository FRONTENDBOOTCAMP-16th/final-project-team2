import Image from "next/image"
import SwiperSection from "./SwiperSection"
import ProductsRecommendationList from "./ProductsRecommendationList"
import ProductsCard from "./ProductsCard"
import products from '@/data/dummyproducts.json'
import newProducts from '@/data/dummyNewProducts.json'
import ProductsCardList from "./ProductsCardList"
import ProductTodayList from "./ProductsToday"

const INVENTORY_PRODUCTS = 4
const DISCOUNT_PRODUCTS = 2
const MD_PRODUCTS = 4

const swiperList = [
  { title: '신상품 추천', image: '/slide_bg_1.png'},
  { title: '베스트 상품', image: '/slide_bg_2.png'},
]

export default function Main() {
  return (
    <main className="w-full h-full min-h-full flex-1">
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* 오늘의 특가 */}
      <div className="mbs-23 px-10 max-w-7xl m-auto">
        <h2 className="text-4xl flex gap-4 font-bold">
          <Image
            src ={'/icon_cart.png'}
            alt=""
            width={40}
            height={40}
            loading="eager"
          />
          오늘의 특가
        </h2>
        <p className="text-gray-600 ps-14 pbs-3 pb-12">서브 타이틀</p>

        <ProductsRecommendationList className="flex [&>li]:border [&>li]:flex-1 [&_img]:object-cover [&_img]:w-60 [&_img]:h-60 [&_a]:flex [&_dl]:flex [&_dl]:h-full [&_dl]:flex-col [&_dl]:flex-1 [&_a>div]:p-5 [&_a>div]:mbs-0 [&_a>div]:flex-1 [&_dl>dd:nth-of-type(3)]:order-2 [&_dl>div]:order-1 [&_dl>div]:flex-1 [&_dl>div]:items-end [&_dl>div]:justify-between gap-4 justify-center">
          <ProductsCard maxProducts={DISCOUNT_PRODUCTS} products={products} hasLike/>
        </ProductsRecommendationList>
      </div>

      {/* MD 추천 상품 */}
      <div className="mbs-23 px-10 max-w-7xl m-auto">
        <h2 className="text-center text-4xl font-bold">MD 추천 상품</h2>
        <p className="text-center text-gray-600 pbs-3 pb-12">이번주 인기상품을 확인해보세요</p>

        <ProductsCardList>
          <ProductsCard maxProducts={MD_PRODUCTS} products={products} />
        </ProductsCardList>
      </div>

      {/* 오늘의 신상품 */}
      <div className="mbs-50 relative w-full h-126 min-h-250px sm:min-h-300px flex flex-col justify-center px-6 sm:px-12 overflow-hidden">
        <ProductTodayList products={newProducts} image="/new_product_bg.png"/>
      </div>

      {/* 품절 임박 꿀템 */}
      <div className="mbs-23 px-10 pbe-40 max-w-7xl m-auto">
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
      </div>
    </main>
  )
}
