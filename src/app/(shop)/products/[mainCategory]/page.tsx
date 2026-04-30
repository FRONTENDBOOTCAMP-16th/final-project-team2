import products from '@/data/dummyproducts.json';
import Pagination from '@/app/components/Pagination';
import Depth from './_component/depth';
import ProductArea from './_component/ProductArea';
import FilterCategory from './_component/filterCategory';
import Sort from './_component/Sort';
import { sortProducts } from './util/sort';

type Product = {
  params: Promise<{
    mainCategory: string;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: string;
  }>;
};

const ProductListPage = async ({ searchParams, params }: Product) => {
  const { category, page, sort } = await searchParams;
  const { mainCategory } = await params;

  const filtered = category ? products.filter(product => product.category === category) : products;

  const PAGE_SIZE = 12;
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const sorted = sortProducts(filtered, sort);
  const paginated = sorted.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Depth mainCategory={mainCategory} />
      <div className="text-center">
        <h1 className="text-[48px] bold mb-5">필기구</h1>
        <p className="text-base font-semibold text-gray-600">장인은 도구탓을 합니다</p>
      </div>
      <div className="flex justify-between mb-16 mt-18">
        <FilterCategory sort={sort} mainCategory={mainCategory} category={category} />
        <Sort />
      </div>
      <main>
        <ProductArea paginated={paginated} pageSize={PAGE_SIZE} />
        <Pagination pagesize={PAGE_SIZE} baseUrl="/products" mainCategory={mainCategory} searchParams={searchParams} />
      </main>
    </div>
  );
};

export default ProductListPage;
