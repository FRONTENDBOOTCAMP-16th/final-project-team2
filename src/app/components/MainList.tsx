import SwiperSection from './SwiperSection';
import ProductsCard from './ProductsCard';
import MainProducts from '@/data/dummyMainproducts.json';
import ProductTodayList from './ProductsToday';
import RecommendMDWrapper from './RecommendMDWrapper';
import ProductsCardList from './ProductsCardList';
import MainCard from './MainCard';
import ProductsTodaySale from './ProductTodaySale';

const INVENTORY_PRODUCTS = 4;
const DISCOUNT_PRODUCTS = 2;
const MD_PRODUCTS = 4;

// 임시로 스와이프 정보 호출
const swiperList = [
  { title: '새학기 준비,\n행쇼마켓에서!', subText: '필기구부터 노트까지, 특가로 만나보세요', tag: 'SPRING SALE', image: '/Hero_banner.png' },
  { title: '행쇼마켓\n특가 할인', subText: '12:00 ~ 18:00까지!', tag: 'TIME SALE', image: '/Hero_banner.png' },
  { title: '품절 임박 꿀템,\n놓치지 마세요', tag: '품절 임박', image: '/Hero_banner.png' },
];

// 임시로 상품데이터 호출 - MD추천 / 오늘의 신상품에 사용
const productList = [
  {
    id: '1',
    category: '만년필',
    name: '멋쟁이 만년필 1',
    discount_rate: 35,
    price: 24000,
    thunmbnail_image: '/today_sale.png',
    inventory: 10,
    updated_at: '2026-03-30T14:30:00.000Z',
  },
  {
    id: '2',
    category: '만년필',
    name: '멋쟁이 만년필 2',
    discount_rate: 26,
    price: 26000,
    thunmbnail_image: '/today_sale.png',
    inventory: 50,
    updated_at: '2026-04-10T14:30:00.000Z',
  },
  {
    id: '3',
    category: '만년필',
    name: '멋쟁이 만년필 3',
    discount_rate: 40,
    price: 26000,
    thunmbnail_image: '/today_sale.png',
    inventory: 2,
    updated_at: '2026-04-20T14:30:00.000Z',
  },
  {
    id: '4',
    category: '페이퍼',
    name: '뉴 글랜 다이어리',
    discount_rate: 37,
    price: 46000,
    thunmbnail_image: '/today_sale.png',
    inventory: 4,
    updated_at: '2026-04-30T14:30:00.000Z',
  },
];

// 특정 기준에 따라 상품을 리스트업
const sortedList = <T extends Record<string, any>>(products: T[], key: keyof T) => {
  return products.toSorted((a, b) => b[key] - a[key])
}


export default function Main() {
  return (
    <>
      {/* 스와이프 섹션 */}
      <SwiperSection swiperList={swiperList} />

      {/* 오늘의 특가 */}
      <section className="bg-[#FFF8F3]">
        <MainCard title="오늘의 특가" subTitle="오늘만 이 가격! 특별한 가격을 확인해보세요">
          <ProductsTodaySale maxProducts={DISCOUNT_PRODUCTS} products={productList} />
        </MainCard>
      </section>

      {/* MD 추천 상품 */}
      <section className="py-22.5 px-4 max-w-7xl m-auto">
        <MainCard title="MD 추천 상품" subTitle="이번주 인기상품을 확인해보세요" fullImage>
          <RecommendMDWrapper maxProducts={MD_PRODUCTS} products={sortedList(MainProducts, 'average_grade')} />
        </MainCard>
      </section>

      {/* 오늘의 신상품 */}
      <section className="relative w-full h-138 min-h-250px sm:min-h-300px flex flex-col justify-center px-4 overflow-hidden">
        <ProductTodayList products={productList} image="/new_product_bg.png" />
      </section>

      {/* 품절 임박 꿀템 */}
      <section className="bg-[#FFF8F3]">
        <MainCard title="품절 임박 꿀템" subTitle="서두르세요! 재고가 얼마 남지 않았어요" fullImage>
          <ProductsCardList>
            <ProductsCard maxProducts={INVENTORY_PRODUCTS} products={sortedList(MainProducts, 'inventory')} />
          </ProductsCardList>
        </MainCard>
      </section>
    </>
  );
}
