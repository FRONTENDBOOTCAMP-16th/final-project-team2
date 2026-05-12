import { ProductLikeWithProduct } from '@/app/lib/productLike'
import { CATEGORY_GROUPS } from '../lib/categoryGroup'

export const filterWishListItems = (
  items: ProductLikeWithProduct[],
  category: string,
) => {
  if (category === 'all') return items

  const selectedGroup = CATEGORY_GROUPS.find((group) => group.id === category)

  return items.filter((item) => {
    return item.products.product_categories.some((pc) =>
      selectedGroup?.categories.includes(pc.categories.name),
    )
  })
}
