import BreadCrumble from '../_component/BreadCrumble';
import ProductInfoComponent from './_components/Product/ProductInfoComponent';
import TabInfoComponent from './_components/Tab/TabInfoComponent';
import { getProductDetail } from './lib/getProductDetail';

type ProductDetailPageProps = {
  params: Promise<{
    mainCategory: string;
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { mainCategory, id } = await params;

  const product = await getProductDetail({id});

  return (
    <div aria-labelledby="product-detail-title" className="mt-5 mb-38 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 id="product-detail-title" className="sr-only">
        제품 상세 페이지
      </h1>

      <BreadCrumble categoryMap={mainCategory} />

      <main>
        <h1>{product.name}</h1>
        <ProductInfoComponent product={product} />
        <TabInfoComponent product={product} />

        <div className="mt-15">{/* <RecomandProduct products={products} /> */}</div>
      </main>
    </div>
  );
}