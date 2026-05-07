import ProductListInner from './ProductListInner';
import { Products } from '@/app/lib/products';

type Props = {
  products: Products[];
  sort?: string;
};

export default function ProductList({ products,  sort }: Props) {

  return <ProductListInner  products={products}  sort={sort} />;
}
