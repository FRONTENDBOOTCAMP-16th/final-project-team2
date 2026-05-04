import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';

type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: string;
};

interface productProps {
  pageSize: number;
  paginated: Product[];
}

const ProductArea = ({ pageSize, paginated }: productProps) => {
  return (
    <section aria-labelledby="productList">
      <h2 className="sr-only" id="productList">
        상품 둘러보기
      </h2>
      <ProductsCardList>
        <ProductsCard maxProducts={pageSize} products={paginated} />
      </ProductsCardList>
    </section>
  );
};

export default ProductArea;
