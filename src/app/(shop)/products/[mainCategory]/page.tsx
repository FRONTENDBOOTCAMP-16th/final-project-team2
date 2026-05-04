import Pagination from '@/app/components/Pagination';
import ProductArea from './_component/ProductArea';
import Sort from './_component/Sort';
import { getProducts } from '@/api/getProducts';
import BreadCrumble from './_component/BreadCrumble';
import FilterCategory from './_component/filterCategory';
import { CATEGORY_MAP, CategoryType } from './lib/category';
type Product = {
  params: Promise<{
    mainCategory: CategoryType;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: string;
  }>;
};

const ProductListPage = async ({ params, searchParams }: Product) => {
  const { mainCategory } = await params;
  const { category: keyword, page = '1', sort = 'latest' } = await searchParams;
  const PAGE_SIZE = 12;

  const data = await getProducts({
    page: page,
    pageSize: 12,
    category: mainCategory,
    sort,
    keyword,
  });

  console.log(mainCategory);

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BreadCrumble categoryMap={CATEGORY_MAP[mainCategory].label} />
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-3">{keyword ? keyword : CATEGORY_MAP[mainCategory].label}</h1>
        <p className="text-base mt-3 font-semibold text-gray-600">장인은 도구탓을 합니다</p>
      </div>

      <div className="flex justify-between mb-16 mt-18">
        <FilterCategory mainCategory={mainCategory} sort={sort} category={keyword} />
        <Sort mainCategory={mainCategory} />
      </div>

      <main>
        <ProductArea pageSize={PAGE_SIZE} paginated={data.products} />
        <Pagination baseUrl={'/products'} mainCategory={mainCategory} searchParams={searchParams} pagesize={PAGE_SIZE} />
      </main>
    </div>
  );
};

export default ProductListPage;
