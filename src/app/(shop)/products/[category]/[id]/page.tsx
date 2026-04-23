import Image from 'next/image';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
import products from '@/data/dummyproducts.json';

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

const DETAIL_TABS = [
  { id: 'detail', label: '제품 상세' },
  { id: 'store', label: '가게 정보' },
  { id: 'review', label: '리뷰(100)' },
] as const;

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex gap-6 py-4">
        <dt className="text-gray-700 text-[18px] mr-4">{label}</dt>
        <dd className=" text-sm text-gray-600">{children}</dd>
      </div>
      <hr className="w-full border-gray-200" />
    </>
  );
}

function ActionButton({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  const base = 'flex-1 flex items-center justify-center gap-2 py-4 rounded-lg transition-colors';
  const styles = variant === 'primary' ? 'bg-black text-white hover:bg-gray-800' : 'border border-gray-300 bg-white text-black hover:bg-gray-50';

  return (
    <button type="button" className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export default function ProductDetailPage() {
  return (
    <section aria-labelledby="product-detail-title" className="py-10">
      <h1 id="product-detail-title" className="sr-only">
        제품 상세 페이지
      </h1>

      <article className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 self-start">
            <Image
              src="/pen_dummy.jpg"
              alt={`${PRODUCT.name} 제품 이미지`}
              width={585}
              height={585}
              priority
              className="w-full rounded-lg object-cover"
            />
          </div>

          <section aria-labelledby="product-info-title">
            <h2 id="product-info-title" className="sr-only">
              제품 소개
            </h2>

            <div className="space-y-6">
              <dl className="space-y-3">
                <div>
                  <dt className="sr-only">제품 타입</dt>
                  <dd className="text-lg text-gray-600">{PRODUCT.category}</dd>
                </div>

                <div>
                  <dt className="sr-only">제품명</dt>
                  <dd className="text-3xl font-semibold">{PRODUCT.name}</dd>
                </div>

                <div>
                  <dt className="sr-only">정가</dt>
                  <dd>
                    <del className="text-lg text-gray-400">{formatPrice(PRODUCT.originalPrice)}</del>
                  </dd>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <dt className="sr-only">할인율</dt>
                    <dd className="text-xl font-bold text-orange-800">{PRODUCT.discountRate}%</dd>
                  </div>

                  <div>
                    <dt className="sr-only">할인가</dt>
                    <dd className="text-2xl font-semibold">{formatPrice(PRODUCT.salePrice)}</dd>
                  </div>
                </div>
              </dl>

              <hr className="w-full m-0 border-gray-200" />

              <dl>
                <InfoRow label="적립">
                  <button type="button" className="text-sm underline">
                    등급 별 정책 확인하기 →
                  </button>
                </InfoRow>

                <InfoRow label="배송">
                  <div className="space-y-1">
                    {PRODUCT.shipping.map(text => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </InfoRow>
              </dl>

              <div className="inline-block">
                <label htmlFor="quantity" className="text-[18px] text-gray-700">
                  개수
                </label>

                <div className="mt-4 flex items-center overflow-hidden rounded border">
                  <button type="button" aria-label="한개 제거" className="border-r px-4 py-1 text-3xl text-gray-400 cursor-not-allowed" disabled>
                    -
                  </button>

                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    value={1}
                    readOnly
                    className="w-20 py-2.5 ml-3 text-center outline-none"
                  />

                  <button type="button" aria-label="한개 추가" className="border-l bg-white px-4 py-1 text-3xl text-black">
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <button type="button" className="w-full rounded-lg bg-black py-4 text-white transition-colors hover:bg-gray-800">
                  장바구니 담기
                </button>

                <div className="mt-4 flex gap-3">
                  <ActionButton variant="secondary">좋아요</ActionButton>
                  <ActionButton variant="secondary">공유하기</ActionButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      <article className="mx-auto mt-16 max-w-7xl px-4">
        <header className="border-b border-gray-200">
          <nav aria-label="상품 상세 탭">
            <ul className="flex gap-6">
              {DETAIL_TABS.map(tab => (
                <li key={tab.id}>
                  <button type="button" className="border-b-2 border-transparent px-1 py-4 text-gray-700 transition-colors hover:text-black">
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <section className="py-8" aria-labelledby="detail-content-title">
          <h2 id="detail-content-title" className="text-2xl font-semibold">
            제품 상세
          </h2>

          <p className="mt-4 max-w-3xl break-keep leading-8 text-gray-700">{PRODUCT.description}</p>

          <dl className="mt-10">
            <InfoRow label="배송">
              <p>{PRODUCT.shipping[0]}</p>
            </InfoRow>

            <InfoRow label="반품/교환">
              <p>{PRODUCT.returnPolicy}</p>
            </InfoRow>

            <InfoRow label="원산지">
              <p>{PRODUCT.countryOfOrigin}</p>
            </InfoRow>
          </dl>
        </section>
      </article>

      <section aria-labelledby="recommend-products-title" className="mx-auto mt-16 max-w-7xl px-4">
        <h2 id="recommend-products-title" className="mb-6 text-2xl font-semibold">
          제품 추천
        </h2>

        <ProductsCardList>
          <ProductsCard maxProducts={4} products={products} />
        </ProductsCardList>
      </section>
    </section>
  );
}
