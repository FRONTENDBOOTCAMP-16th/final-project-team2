import { getRecommendedProducts } from '@/api/recommandProducts'
import ProductsCard from '@/app/components/ProductsCard'
import ProductsCardList from '@/app/components/ProductsCardList'

type Props = {
  productId: string
  mainCategoryName: string
  onImageLoad?: () => void
}

const RecommendProducts = async ({
  productId,
  mainCategoryName,
  onImageLoad,
}: Props) => {
  const products = await getRecommendedProducts({
    productId,
    mainCategoryName,
  })

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-semibold">추천 상품</h2>

      <ProductsCardList>
        {products.map((product) => (
          <ProductsCard
            key={product.id}
            category={mainCategoryName}
            product={product}
            onImageLoad={onImageLoad}
          />
        ))}
      </ProductsCardList>
    </section>
  )
}

export default RecommendProducts
