import { Suspense } from 'react'
import SwiperSection from './SwiperSection'
import ProductTodaySaleCard from './ProductTodaySaleCard'
import RecommendMD from './RecommendMD'
import TodaySale from './TodaySale'
import ProductsNew from './ProductsNew'
import ProductInventory from './ProductInventory'
import ProductsCardList from '../ProductsCardList'
import CardSkeleton from './skeleton/CadeSkeleton'
import TodaySaleCardSkeleton from './skeleton/TodaySaleCardSkeleton'
import FullSkeleton from './skeleton/FullSkeleton'

const INVENTORY_PRODUCTS = 4
const DISCOUNT_PRODUCTS = 2
const MD_PRODUCTS = 4

// 임시로 스와이프 정보 호출
const swiperList = [
  {
    title: '새학기 준비,\n행쇼마켓에서!',
    subText: '필기구부터 노트까지, 특가로 만나보세요',
    tag: 'SPRING SALE',
    image: '/Hero_banner.png',
  },
  {
    title: '행쇼마켓\n특가 할인',
    subText: '12:00 ~ 18:00까지!',
    tag: 'TIME SALE',
    image: '/Hero_banner.png',
  },
  {
    title: '품절 임박 꿀템,\n놓치지 마세요',
    tag: '품절 임박',
    image: '/Hero_banner.png',
  },
]

export default function Main() {
  return (
    <>
      {/* 스와이프 섹션 */}
      <Suspense fallback={<FullSkeleton />}>
        <SwiperSection swiperList={swiperList} />
      </Suspense>

      {/* 오늘의 특가 */}
      <section className="bg-[#FFF8F3]">
        <ProductTodaySaleCard
          title="오늘의 특가"
          subTitle="오늘만 이 가격! 특별한 가격을 확인해보세요"
        >
          <Suspense fallback={<TodaySaleCardSkeleton count={2} />}>
            <TodaySale maxProducts={DISCOUNT_PRODUCTS} />
          </Suspense>
        </ProductTodaySaleCard>
      </section>

      {/* MD 추천 상품 */}
      <section className="m-auto max-w-7xl px-4 py-22.5">
        <ProductTodaySaleCard
          title="MD 추천 상품"
          subTitle="이번주 인기상품을 확인해보세요"
          fullImage
        >
          <Suspense fallback={<CardSkeleton count={4} />}>
            <RecommendMD maxProducts={MD_PRODUCTS} />
          </Suspense>
        </ProductTodaySaleCard>
      </section>

      {/* 오늘의 신상품 */}
      <section className="min-h-250px sm:min-h-300px relative flex h-138 w-full flex-col justify-center overflow-hidden px-4">
        <Suspense fallback={<FullSkeleton />}>
          <ProductsNew image="/new_product_bg.png" />
        </Suspense>
        x{' '}
      </section>

      {/* 품절 임박 꿀템 */}
      <section className="min-h-183 w-full bg-[#FFF8F3]">
        <ProductTodaySaleCard
          title="품절 임박 꿀템"
          subTitle="서두르세요! 재고가 얼마 남지 않았어요"
          fullImage
        >
          <div className="">
            <Suspense fallback={<CardSkeleton count={4} />}>
              <ProductsCardList className="grid-cols-1! sm:grid-cols-2! lg:grid-cols-4!">
                <ProductInventory maxProducts={INVENTORY_PRODUCTS} />
              </ProductsCardList>
            </Suspense>
          </div>
        </ProductTodaySaleCard>
      </section>
    </>
  )
}
