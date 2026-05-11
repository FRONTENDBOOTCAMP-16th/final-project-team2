import { Products } from '@/app/lib/products';
import ProductInfoTable from './ProductInfoTable';
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
    </>
  );
};

export default TabInfoComponent;
