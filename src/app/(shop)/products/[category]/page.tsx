import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
const ProductListPage = () => {
  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="sr-only">제품 목록 페이지</h1>
      <div className="flex justify-between mb-16">
        <ul className="flex gap-1.5">
          <li>
            <Link href="/all" className="p-2 rounded-2xl bg-black text-white">
              전체
            </Link>
          </li>
          <div aria-hidden>/</div>
          <li>
            <Link href="/ballpen">볼펜</Link>
          </li>
          <div aria-hidden>/</div>
          <li>
            <Link href="/fountainpen">만년필</Link>
          </li>
        </ul>

        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select name="filter" id="filter" className="border-2 p-1 rounded-2xl">
          <option value="lastProduct">최신순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>

      <section aria-labelledby="productList">
        <h2 className="sr-only" id="productList">
          상품 정보
        </h2>
        <ProductsCardList>
          <ProductsCard maxProducts={12} products={products} />
        </ProductsCardList>
        <div className="pagenation flex gap-8 justify-center mt-24 mb-20">
          <button className="rounded-full bg-black text-white p-3">이전</button>
          <button className="underline font-medium">1</button>
          <button>2</button>
          <button className="rounded-full bg-black text-white p-3">다음</button>
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
