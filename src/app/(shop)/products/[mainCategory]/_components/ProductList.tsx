import ProductListInner from './ProductListInner'
import { Products } from '@/app/lib/products'

type Props = {
  products: Products[];
  sort?: string;
  category: string;
};

export default function ProductList({ category, products, sort }: Props) {
  return <ProductListInner category={category} products={products} sort={sort} />;
}
