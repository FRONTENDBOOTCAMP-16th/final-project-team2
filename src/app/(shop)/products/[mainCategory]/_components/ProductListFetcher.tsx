import { getProductsCategory } from '@/api/getProducts';
import ProductListInner from './ProductListInner';
import { Categories } from '@/app/lib/Categories';

type Props = {
  page: string;
  pageSize: number;
  category: string;
  sort: string;
  keyword?: string;
};


export default async function ProductListFetcher({
  page,
  pageSize,
  category,
  sort,
}: Props) {
  const data = await getProductsCategory({
    page,
    pageSize,
    category,
    sort,
  });

  return (
    <ProductListInner
      products={data.products}
      category={category}
      sort={sort}
    />
  );
}