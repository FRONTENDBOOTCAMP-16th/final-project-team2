import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';

const MAX_PRODUCT_COUNT = 12;
const PREFIX_URL = '/products';

const categories = [
  { href: `${PREFIX_URL}/all`, label: '전체', active: true },
  { href: `${PREFIX_URL}/ballpen`, label: '볼펜' },
  { href: `${PREFIX_URL}/fountainpen`, label: '만년필' },
];

const filters = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'highPrice', label: '가격 높은 순' },
  { value: 'lowPrice', label: '가격 낮은 순' },
];

const ProductListPage = () => {
  const hasProducts = products.length > 0;

  return (
    <main className="mx-auto w-full max-w-310 px-4 sm:px-6 lg:px-8">
      <h1 className="sr-only">제품 목록 페이지</h1>
      <div className="mb-16 flex items-center justify-between">
        <nav aria-label="상품 카테고리">
          <ul className="flex items-center gap-1.5">
            {categories.map((category, index) => (
              <li key={category.href} className="flex items-center gap-1.5">
                <Link
                  href={category.href}
                  aria-current={category.active ? 'page' : undefined}
                  className={category.active ? 'rounded-2xl bg-black px-3 py-2 text-white' : 'px-3 py-2'}
                >
                  {category.label}
                </Link>

                {index < categories.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <label htmlFor="filter" className="sr-only">
            상품 정렬
          </label>
          <select id="filter" name="filter" className="rounded-2xl border-2 p-1">
            {filters.map(filter => {
              return (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <section aria-labelledby="productList">
        <h2 id="productList" className="sr-only">
          상품 정보
        </h2>

        {hasProducts ? (
          <ProductsCardList>
            <ProductsCard maxProducts={MAX_PRODUCT_COUNT} products={products} />
          </ProductsCardList>
        ) : (
          <div className="border">
            <p className="py-20 text-center text-gray-500">현재 등록된 상품이 없습니다.</p>
          </div>
        )}

        <nav className="mt-24 mb-20 flex justify-center gap-8" aria-label="페이지네이션">
          <button type="button" className="rounded-full bg-black p-3 text-white">
            이전
          </button>
          <button type="button" aria-current="page" className="font-medium underline">
            1
          </button>
          <button type="button">2</button>
          <button type="button" className="rounded-full bg-black p-3 text-white">
            다음
          </button>
        </nav>
      </section>
    </main>
  );
};

export default ProductListPage;
