import { Suspense } from 'react';
import SwiperSection from './SwiperSection';
import ProductTodaySaleCard from './ProductTodaySaleCard';
import RecommendMD from './RecommendMD';
import TodaySale from './TodaySale';
import ProductsNew from './ProductsNew';
import MainCard from './MainCard';
import ProductInventory from './ProductInventory';
import ProductsCardList from '../ProductsCardList';

const INVENTORY_PRODUCTS = 4;
const DISCOUNT_PRODUCTS = 2;
const MD_PRODUCTS = 4;

// 임시로 스와이프 정보 호출
const swiperList = [
  { title: '새학기 준비,\n행쇼마켓에서!', subText: '필기구부터 노트까지, 특가로 만나보세요', tag: 'SPRING SALE', image: '/Hero_banner.png' },
  { title: '행쇼마켓\n특가 할인', subText: '12:00 ~ 18:00까지!', tag: 'TIME SALE', image: '/Hero_banner.png' },
  { title: '품절 임박 꿀템,\n놓치지 마세요', tag: '품절 임박', image: '/Hero_banner.png' },
];

export default function Main() {
  return (
    <Suspense>
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* 오늘의 특가 */}
      <section className="bg-[#FFF8F3]">
        <ProductTodaySaleCard title="오늘의 특가" subTitle="오늘만 이 가격! 특별한 가격을 확인해보세요">
          <TodaySale maxProducts={DISCOUNT_PRODUCTS} />
        </ProductTodaySaleCard>
      </section>

      {/* MD 추천 상품 */}
      <section className="py-22.5 px-4 max-w-7xl m-auto">
        <ProductTodaySaleCard title="MD 추천 상품" subTitle="이번주 인기상품을 확인해보세요" fullImage>
          <RecommendMD maxProducts={MD_PRODUCTS} />
        </ProductTodaySaleCard>
      </section>

      {/* 오늘의 신상품 */}
      <section className="relative w-full h-138 min-h-250px sm:min-h-300px flex flex-col justify-center px-4 overflow-hidden">
        <ProductsNew image="/new_product_bg.png" />
      </section>

      {/* 품절 임박 꿀템 */}
      <section className="bg-[#FFF8F3]">
        <MainCard title="품절 임박 꿀템" subTitle="서두르세요! 재고가 얼마 남지 않았어요" fullImage>
          <ProductsCardList className='grid-cols-1! sm:grid-cols-2! lg:grid-cols-4!'>
            <ProductInventory maxProducts={INVENTORY_PRODUCTS} />
          </ProductsCardList>
        </MainCard>
      </section>
    </Suspense>
  );
}
