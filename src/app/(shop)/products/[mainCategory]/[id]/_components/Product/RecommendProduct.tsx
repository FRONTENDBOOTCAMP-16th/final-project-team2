import { getRecommendedProducts } from '@/api/recommandProducts'
import ProductsCard from '@/app/components/ProductsCard'
import ProductsCardList from '@/app/components/ProductsCardList'
import { MainCategoryType } from '../../../lib/category'

type Props = {
  productId: string
  mainCategoryKey: MainCategoryType
  onImageLoad?: () => void
}

const RecommendProducts = async ({
  productId,
  mainCategoryKey,
  onImageLoad,
}: Props) => {
  const products = await getRecommendedProducts({
    productId,
    mainCategoryKey,
  })

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-semibold">추천 상품</h2>

      <ProductsCardList>
        {products.map((product, i) => (
          <ProductsCard
            key={product.id}
            category={mainCategoryKey}
            product={product}
            onImageLoad={onImageLoad}
          />
        ))}
      </ProductsCardList>
    </section>
  )
}

export default RecommendProducts
