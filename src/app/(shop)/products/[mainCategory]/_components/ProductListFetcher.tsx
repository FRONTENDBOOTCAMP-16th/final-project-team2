import { getProductsCategory } from '@/api/getProducts';
import ProductListInner from './ProductListInner';
import Pagination from '@/app/components/Pagination';

type Props = {
  page: number;
  pageSize: number;
  mainCategory: string;
  category?: string;
  sort: string;
};

export default async function ProductListFetcher({ page, pageSize, mainCategory, category, sort }: Props) {
  const data = await getProductsCategory({
    page,
    pageSize,
    mainCategory,
    category,
    sort,
  });

  return (
    <div>
      <ProductListInner products={data.products ?? []} category={mainCategory} sort={sort} />

      <Pagination
        baseUrl="/products"
        mainCategory={mainCategory}
        category={category}
        sort={sort}
        page={page}
        pageSize={pageSize}
        totalCount={data.totalCount}
        products={data.products}
      />
    </div>
  );
}
