import { Products } from '@/app/lib/products';
import { Store } from '@/app/lib/Stores';
import ProductInfoTable from './ProductInfoTable';
import TabProductsInfo from './TabProductsInfo';
import TabStoreInfo from './TabStoreInfo';
import { Reviews } from '@/app/lib/Reviews';
import ReviewList from '../Review/ReviewList';
import ReviewChart from '../Review/ReviewChart';
import Review from '../Review/Review';

type Props = {
  product: Products;
  store: Store;
  reviews: Reviews[];
  seller: string;
  average_grade: number|null;
};

export default function TabInfoComponent({ product, store, reviews, seller,average_grade }: Props) {

  return (
    <TabProductsInfo
      product={product}
      productContent={<ProductInfoTable />}
      storeContent={<TabStoreInfo store={store} seller={seller} />}
      reviewContent={
        <ReviewList>
          <ReviewChart reviews={reviews} average_grade={average_grade} />
          <Review reviews={reviews} />
        </ReviewList>
      }
    />
  );
}
