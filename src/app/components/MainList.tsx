import Image from "next/image"
import SwiperSection from "./SwiperSection"
import ProductsCard from "./ProductsCard"
import products from '@/data/dummyproducts.json'
import MDProducts from '@/data/dummyMDproducts.json'
import ProductTodayList from "./ProductsToday"
import ProductsTodaySale from "./ProductsTodaySale"
import RecommendMDWrapper from "./RecommendMDWrapper"

const INVENTORY_PRODUCTS = 4
const DISCOUNT_PRODUCTS = 2
const MD_PRODUCTS = 4

// 임시로 스와이프 정보 호출
const swiperList = [
  { title: '새학기 준비,\n행쇼마켓에서!', subText: '필기구부터 노트까지, 특가로 만나보세요', tag: 'SPRING SALE', image: '/Hero_banner.png'},
  { title: '행쇼마켓\n특가 할인', subText: '12:00 ~ 18:00까지!', tag: 'TIME SALE', image: '/Hero_banner.png'},
  { title: '품절 임박 꿀템,\n놓치지 마세요', image: '/Hero_banner.png'},
]

// 임시로 상품데이터 호출 - MD추천 / 오늘의 신상품에 사용
const productList =[
  { id:'1', category:'만년필', name: '멋쟁이 만년필 1', discount_rate: 35, price: 24000, thunmbnail_image: '/today_sale.png', updated_at: '2026-03-30T14:30:00.000Z' },
  { id:'2', category:'만년필', name: '멋쟁이 만년필 2', discount_rate: 26, price: 26000, thunmbnail_image: '/today_sale.png', updated_at: '2026-04-10T14:30:00.000Z' },
  { id:'3', category:'만년필', name: '멋쟁이 만년필 3', discount_rate: 40, price: 26000, thunmbnail_image: '/today_sale.png', updated_at: '2026-04-20T14:30:00.000Z' },
  { id:'4', category:'페이퍼', name: '뉴 글랜 다이어리', discount_rate: 37, price: 46000, thunmbnail_image: '/today_sale.png', updated_at: '2026-04-30T14:30:00.000Z' },
]

// 평점에 따라 상품을 추천
const sortedMDList = MDProducts.toSorted((a, b) => {
  return b.average_grade - a.average_grade
})


export default function Main() {
  return (
    <>
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* 오늘의 특가 */}
      <section className="bg-[#FFF8F3]">
        <div className="py-22.5 px-4 max-w-7xl m-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold font-4">오늘의 특가</h2>
            <p className="text-[#7B7979] mbs-5 mb-12.5">오늘만 이 가격! 특별한 가격을 확인해보세요</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ProductsTodaySale maxProducts={DISCOUNT_PRODUCTS} products={productList} />
          </div>
        </div>
      </section>

      {/* MD 추천 상품 */}
      <section className="py-22.5 px-4 max-w-7xl m-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold font-4">MD 추천 상품</h2>
          <p className="text-[#7B7979] mbs-5 mb-12.5">이번주 인기상품을 확인해보세요</p>
        </div>

        <div className="[&_a>div]:w-full! [&_li>button]:right-0">
          <RecommendMDWrapper maxProducts={MD_PRODUCTS} products={sortedMDList}/>
        </div>
      </section>

      {/* 오늘의 신상품 */}
      <section className="relative w-full h-138 min-h-250px sm:min-h-300px flex flex-col justify-center px-4 overflow-hidden">
        <ProductTodayList products={productList} image="/new_product_bg.png"/>
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

        {/* <ProductsRecommendationList className="flex [&>li]:border [&>li]:p-4 gap-4 justify-center"> */}
          <ProductsCard maxProducts={INVENTORY_PRODUCTS} products={products} hasLike/>
        {/* </ProductsRecommendationList> */}
      </section>
    </>
  )
}
