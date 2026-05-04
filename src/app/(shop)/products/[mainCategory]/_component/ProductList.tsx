'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Products } from '../lib/products';
import ProductListInner from './ProductListInner';

type Props = {
  products: Products[];
  keyword?: string;
  sort?: string;
};

export default function ProductList({ products, keyword, sort }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryKey = searchParams.toString();
  const productsKey = products.map(product => product.id).join('-');

  const listKey = `${pathname}?${queryKey}-${productsKey}`;

  return <ProductListInner key={listKey} products={products} keyword={keyword} sort={sort} />;
}
