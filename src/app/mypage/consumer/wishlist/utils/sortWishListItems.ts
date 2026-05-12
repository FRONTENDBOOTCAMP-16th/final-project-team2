import { ProductLikeWithProduct } from '@/app/lib/productLike'

export type SORTTYPE = 'latest' | 'price-high' | 'price-low'

export const sortWishListItems = (
  items: ProductLikeWithProduct[],
  sort: SORTTYPE,
) => {
  return items.toSorted((a, b) => {
    switch (sort) {
      case 'price-high':
        return (
          b.products.price * (1 - b.products.discount_rate / 100) -
          a.products.price * (1 - a.products.discount_rate / 100)
        )

      case 'price-low':
        return (
          a.products.price * (1 - a.products.discount_rate / 100) -
          b.products.price * (1 - b.products.discount_rate / 100)
        )

      case 'latest':
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

      default:
        return 0
    }
  })
}
