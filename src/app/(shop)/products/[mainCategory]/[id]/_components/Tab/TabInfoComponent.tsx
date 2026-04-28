import ProductInfoTable from './ProductInfoTable';
import Review from './ReviewChart';
import TabProductsInfo from './TabProductsInfo';

type Product = {
  category: string;
  name: string;
  originalPrice: number;
  discountRate: number;
  salePrice: number;
  shipping: string[];
  returnPolicy: string;
  countryOfOrigin: string;
  description: string;
};
type Props = {
  product: Product;
};
const TabInfoComponent = ({ product }: Props) => {
  return (
    <>
      <TabProductsInfo product={product}>
        <div className="mt-4">
          <ProductInfoTable product={product} />
        </div>
      </TabProductsInfo>

      <hr />
      <Review />
    </>
  );
};

export default TabInfoComponent;
