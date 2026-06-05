import { getRecommendedProducts } from '@/api/recommandProducts'
import ProductsCard from '@/app/components/ProductsCard'
import ProductsCardList from '@/app/components/ProductsCardList'
import { MainCategoryType } from '../../../lib/category'

type Props = {
  productId: string
  mainCategoryKey: MainCategoryType
}

const RecommendProducts = async ({ productId, mainCategoryKey }: Props) => {
  const products = await getRecommendedProducts({
    productId,
    mainCategoryKey,
  })

  if (products.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="RecommendProducts" className="mt-20">
      <h3 id="RecommendProducts" className="mb-6 text-2xl font-semibold">
        추천 상품
      </h3>

      <ProductsCardList>
        {products.map((product) => (
          <ProductsCard
            isPriority={false}
            key={product.id}
            category={mainCategoryKey}
            product={product}
          />
        ))}
      </ProductsCardList>
    </section>
  )
}

export default RecommendProducts
