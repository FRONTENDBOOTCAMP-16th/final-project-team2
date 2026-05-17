'use client'

import WishListItemCard from './WishListItemsCard'
import TabFilter from './tabFilter'
import Pagination from '@/app/mypage/seller/delivery/components/Pagination'
import { useQuery } from '@tanstack/react-query'
import { fetchLikes } from '@/app/mypage/api/fetchLikes'
import { ProductLikeWithProduct } from '@/app/lib/productLike.types'
import { useRouter, useSearchParams } from 'next/navigation'
import EmptyWishlist from './EmptyWishlist'
import MyPageProductSkeleton from '@/app/mypage/components/MypageProductSkeleton'
import { SORTTYPE, sortWishListItems } from '../utils/sortWishListItems'
import { getWishListCategoryTabs } from '../utils/getWishListCategoryTabs'

export default function WishListItemsList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 9
  const category = searchParams.get('category') ?? 'all'
  const sort = (searchParams.get('sort') as SORTTYPE) ?? 'latest'

  const onChangeCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', slug)
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const onChangeSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const onChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    router.push(`?${params.toString()}`)
  }

  const { data, isLoading } = useQuery<{
    items: ProductLikeWithProduct[]
    count: number
  }>({
    queryKey: ['likes', page, category],
    queryFn: () => fetchLikes(page, limit, category),
  })
  const safeItems = data?.items ?? []
  const categoryTabs = getWishListCategoryTabs()
  const sortedItems = sortWishListItems(safeItems, sort)
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / limit)

  if (isLoading || !data?.items) {
    return <MyPageProductSkeleton count={9} />
  }

  const hasItems = sortedItems.length > 0

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="overflow-x-auto">
          <TabFilter
            items={categoryTabs}
            selectedValue={category}
            onValueChange={onChangeCategory}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="wishlist-sort-filter" className="sr-only">
            필터
          </label>
          <select
            name="wishlist-sort-filter"
            id="wishlist-sort-filter"
            className="h-9 w-full border border-gray-400 px-2 sm:w-auto"
            value={sort}
            onChange={(e) => onChangeSort(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="price-high">금액 높은 순</option>
            <option value="price-low">금액 낮은 순</option>
          </select>
        </div>
      </div>

      {hasItems ? (
        <>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {sortedItems.map((item) => (
              <li key={item.id}>
                <WishListItemCard order={item} />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onChangePage}
          />
        </>
      ) : (
        <EmptyWishlist />
      )}
    </>
  )
}
