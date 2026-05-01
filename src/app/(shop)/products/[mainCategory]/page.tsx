import Pagination from '@/app/components/Pagination';
import ProductArea from './_component/ProductArea';
import Sort from './_component/Sort';
import { getProducts } from '@/api/getProducts';
import BreadCrumble from './_component/BreadCrumble';
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
      <BreadCrumble categoryMap={data.category} />

      <div className="text-center">
        <p className="text-base font-semibold text-gray-600">장인은 도구탓을 합니다</p>
      </div>

      <div className="flex justify-between mb-16 mt-18">
        <Sort />
      </div>

      <main>
        <ProductArea pageSize={PAGE_SIZE} paginated={data.products} />
        <Pagination baseUrl={'/products'} mainCategory={mainCategory} searchParams={searchParams} pagesize={PAGE_SIZE} />
      </main>
    </div>
  );
};

export default ProductListPage;
