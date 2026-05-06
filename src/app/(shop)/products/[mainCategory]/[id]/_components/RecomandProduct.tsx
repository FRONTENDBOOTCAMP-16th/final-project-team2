import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';

type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  popularity: number;
  createdAt: string;
};

interface RecomandProps {
  products: Product[];
}

const RecomandProduct = ({ products }: RecomandProps) => {
  const MAX_PAGE_SIZE = 4;
  return (
    <section aria-labelledby="recommend-products-title" className="mx-auto mt-16 max-w-7xl px-4">
      <h2 id="recommend-products-title" className="mb-6 text-2xl font-semibold">
        제품 추천
      </h2>

      <ProductsCardList>
        <ProductsCard maxProducts={MAX_PAGE_SIZE} products={products} />
      </ProductsCardList>
    </section>
  );
};

export default RecomandProduct;
