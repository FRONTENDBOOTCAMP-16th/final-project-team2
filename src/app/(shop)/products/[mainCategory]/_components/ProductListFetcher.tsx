import { getProducts } from '@/api/getProducts';
import { CategoryType } from '../lib/category';
import ProductList from './ProductList';

type ProductListFetcherProps = {
  page: string;
  pageSize: number;
  category: CategoryType;
  sort: string;
  keyword?: string;
};

export default async function ProductListFetcher({ page, pageSize, category, sort, keyword }: ProductListFetcherProps) {
  const data = await getProducts({
    page,
    pageSize,
    category,
    sort,
    keyword,
  });

  return <ProductList products={data.products} keyword={keyword} sort={sort} />;
}
