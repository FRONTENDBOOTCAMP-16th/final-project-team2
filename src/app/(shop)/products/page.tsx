import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
import Pagination from '@/app/components/Pagination';

type Product = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const ProductListPage = async ({ searchParams }: Product) => {
  const { category, page } = await searchParams;

  const filtered = category ? products.filter(product => product.category === category) : products;
  const PAGE_SIZE = 16;
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="sr-only">제품 목록 페이지</h1>
      <div className="flex justify-between mb-16">
        <ul className="flex gap-1.5">
          <li>
            <Link href="/products" className="p-2 rounded-2xl bg-black text-white">
              전체
            </Link>
          </li>
          <div aria-hidden>/</div>
          <li>
            <Link href="/products?category=ballpen">볼펜</Link>
          </li>
          <div aria-hidden>/</div>
          <li>
            <Link href="/products?category=fountainpen">만년필</Link>
          </li>
          <div aria-hidden>/</div>
          <li>
            <Link href="/products?category=note">노트</Link>
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
        <hr />
        <ProductsCardList>
          <ProductsCard maxProducts={12} products={paginated} />
        </ProductsCardList>
      </section>
      <Pagination searchParams={searchParams} />
    </div>
  );
};

export default ProductListPage;
