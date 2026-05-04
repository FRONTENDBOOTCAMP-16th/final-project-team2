import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: 'ballpen' | 'fountainpen';
  popularity: number;
  createdAt: string;
}

interface ProductListProps {
  products: Product[];
  category: string;
  sort: string;
}

const ProductList = ({ products }: ProductListProps) => {
  const hasProducts = products.length > 0;
  const MAX_PRODUCT_LIMIT = 12;

  return (
    <section aria-labelledby="productList">
      <h2 id="productList" className="sr-only">
        상품 정보
      </h2>

      {hasProducts ? (
        <ProductsCardList>
          {/* 이미 page.tsx에서 slice된 상품만 받는 구조 */}
          <ProductsCard maxProducts={MAX_PRODUCT_LIMIT} products={products} />
        </ProductsCardList>
      ) : (
        <div className="border">
          <p className="py-20 text-center text-gray-500">현재 등록된 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default ProductList;
