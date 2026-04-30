import products from '@/data/dummyproducts.json';
import RecomandProduct from './_components/RecomandProduct';
import Depth from '../_component/depth';
import ProductInfoComponent from './_components/Product/ProductInfoComponent';
import TabInfoComponent from './_components/Tab/TabInfoComponent';

const PRODUCT = {
  category: '필기구',
  name: '제품명 펜',
  originalPrice: 8000,
  discountRate: 10,
  salePrice: 6000,
  shipping: ['무료배송(30,000원 이상 무료)', '평균 3일 이내 도착'],
  returnPolicy: '제품 수령 후 7일 이내 가능',
  countryOfOrigin: '한국',
  description:
    'AI 코딩 도구를 활용하면 코드 생성 및 자동화, 개발 워크플로우와의 통합 등이 가능하며 기존 개발 환경 대비 생산성을 높일 수 있습니다. 그러나 개발자를 꿈꾸며 학습을하는 예비 개발자에게 AI 코딩 도구는 양날의 검이 될 수 있습니다. AI 코딩 도구에만 의존하는 주니어 개발자는 경쟁력을 갖출 수 없기 때문입니다. 오히려 더 깊이 있게 언어를 학습하고 좋은 질문을 할 수 있도록 문해력(Literacy)을 기르는 것이 필요합니다. 다만 AI 도구를 완전히 배제하는 것이 아닌 학습을 위한 파트너로서 활용할 것을 추천합니다.',
};

export default function ProductDetailPage() {
  return (
    <div aria-labelledby="product-detail-title" className="mt-5 mb-38 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 id="product-detail-title" className="sr-only">
        제품 상세 페이지
      </h1>
      <Depth mainCategory={'stationery'} productName={'제품 펜'} />
      <main>
        <ProductInfoComponent product={PRODUCT} />
        <TabInfoComponent product={PRODUCT} />
        <div className="mt-15">
          <RecomandProduct products={products} />
        </div>
      </main>
    </div>
  );
}
