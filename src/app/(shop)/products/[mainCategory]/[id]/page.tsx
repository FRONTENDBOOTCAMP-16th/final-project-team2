import { notFound } from 'next/navigation'
import BreadCrumble from '../_components/BreadCrumble'
import { isMainCategory, mainCategoryConvert } from '../lib/category'
import ProductInfoComponent from './_components/Product/ProductInfoComponent'
import TabInfoComponent from './_components/Tab/TabInfoComponent'
import { getProductDetail, getStoreDetailInfo } from '@/api/productDetailApi'
import { getAverageGrade, getProductReviews } from '@/api/review'
import { getSellerUser } from '@/actions/getUser'
import { Suspense } from 'react'
import Skeleton from '../skeleton'
import RecommendProducts from './_components/Product/RecommendProduct'

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

  const categoryLabel = mainCategoryConvert[mainCategory]
  const product = await getProductDetail({ id, mainCategory })
  const reviews = await getProductReviews(id)
  const store = await getStoreDetailInfo({ id: product.store_id })
  const seller = await getSellerUser(store.owner_id)
  const average_grade = await getAverageGrade(product.id)
  const options = product.options

  return (
    <div className="mx-auto mt-5 mb-38 max-w-7xl px-4 sm:px-6 lg:px-8">
      <BreadCrumble category={categoryLabel} />
      <section aria-labelledby="product-detail-title">
        <h2 id="product-detail-title" className="sr-only">
          제품 상세 페이지
        </h2>
        <ProductInfoComponent
          reviews={reviews}
          product={product}
          category={categoryLabel}
          average_grade={average_grade}
          options={options}
        />
        <TabInfoComponent
          product={product}
          store={store}
          reviews={reviews}
          seller={seller}
          average_grade={average_grade}
        />

        <article aria-labelledby="recommendProductsArea" className="mt-15">
          <h2 id="recommendProductsArea" className="sr-only">
            추천 상품 영역
          </h2>
          <Suspense fallback={<Skeleton />}>
            <RecommendProducts
              mainCategoryKey={mainCategory}
              productId={product.id}
            />
          </Suspense>
        </article>
      </section>
    </div>
  )
}
