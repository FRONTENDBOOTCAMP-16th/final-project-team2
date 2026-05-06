import { Products } from '../../../lib/products';
import ProductInfoTable from './ProductInfoTable';
import Review from './ReviewChart';
import TabProductsInfo from './TabProductsInfo';

type Props = {
  product: Products;
};
const TabInfoComponent = ({ product }: Props) => {
  return (
    <>
      <TabProductsInfo product={product}>
        <div className="mt-4">
          <ProductInfoTable />
        </div>
      </TabProductsInfo>

      <hr />
      <Review />
    </>
  );
};

export default TabInfoComponent;
