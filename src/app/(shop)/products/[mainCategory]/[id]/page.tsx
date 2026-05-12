import { notFound } from 'next/navigation';
import BreadCrumble from '../_components/BreadCrumble';
import { isMainCategory, mainCategoryConvert } from '../lib/category';
import ProductInfoComponent from './_components/Product/ProductInfoComponent';
import TabInfoComponent from './_components/Tab/TabInfoComponent';
import { getProductDetail, getStoreDetailInfo } from '@/api/productDetailApi';
import { getProductReviews } from '@/api/review';
import { getSellerUser } from '@/actions/getUser';
import { Suspense } from 'react';
import Skeleton from '../skeleton';
import ProductListFetcher from '../_components/ProductListFetcher';

type ProductDetailPageProps = {
  params: Promise<{
    mainCategory: string
    id: string
  }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { mainCategory, id } = await params

  if (!isMainCategory(mainCategory)) {
    notFound()
  }

  const categoryLabel = mainCategoryConvert[mainCategory];
  const product = await getProductDetail(id);
  const reviews = await getProductReviews(id);
  const store = await getStoreDetailInfo(product.store_id);
  const seller = await getSellerUser(store.owner_id);
  return (
    <div
      aria-labelledby="product-detail-title"
      className="mx-auto mt-5 mb-38 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <h1 id="product-detail-title" className="sr-only">
        제품 상세 페이지
      </h1>
      <BreadCrumble category={categoryLabel} />
      <main>
        <ProductInfoComponent reviews={reviews} product={product} category={categoryLabel} />
        <TabInfoComponent product={product} store={store} reviews={reviews} seller={seller} />

        <div className="mt-15">
          <h2 className='text-3xl font-bold'>추천 상품</h2>
            <Suspense fallback={<Skeleton />}>
              <ProductListFetcher page={1} pageSize={4} mainCategory={mainCategory} sort={'latest'} pagination={false} />
            </Suspense>
        </div>
      </main>
    </div>
  )
}
