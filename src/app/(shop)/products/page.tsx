import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
import Pagination from '@/app/components/Pagination';
import FilterCategory from './[mainCategory]/_component/filterCategory';

type Product = {
  params: Promise<{
    mainCategory: string;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const ProductListPage = async ({ searchParams, params }: Product) => {
  const { category, page } = await searchParams;
  const { mainCategory } = await params;

  const filtered = category ? products.filter(product => product.category === category) : products;
  const PAGE_SIZE = 16;
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="sr-only">제품 목록 페이지</h1>
      <div className="flex justify-between mb-16">
        <FilterCategory mainCategory={mainCategory} />
        <label htmlFor="sort" className="sr-only">
          정렬
        </label>
        <select name="sort" id="filter" className="border">
          <option value="lastProduct">최신순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>

      <section aria-labelledby="productList">
        <h2 id="productList">볼펜</h2>
        <ProductsCardList>
          <ProductsCard maxProducts={PAGE_SIZE} products={paginated} />
        </ProductsCardList>
      </section>
      {/* <Pagination mainCategory={mainCategory} searchParams={searchParams} /> */}
    </div>
  );
};

export default ProductListPage;
