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
import { useToggleWishList } from '../hooks/useToggleWishList'

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

  // 데이터 가져오기 useQuery
  const { data, isLoading } = useQuery<{
    items: ProductLikeWithProduct[]
    count: number
  }>({
    queryKey: ['likes', page, category],
    queryFn: () => fetchLikes(page, limit, category),
  })
  const safeItems = data?.items ?? []

  // 아이템의 찜하기 버튼 해체 시 해당 아이템 카드 사라지게 하기
  const { mutate: onToggleLikeList } = useToggleWishList()

  // 데이터에서 카테고리 네임 탭 설정
  const categoryTabs = getWishListCategoryTabs()

  // 정렬할 아이템
  const sortedItems = sortWishListItems(safeItems, sort)

  // 페이지네이션
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / limit)

  // 로딩 상태일 때 빈 페이지 방지
  if (isLoading || !data?.items) {
    return <MyPageProductSkeleton count={9} />
  }
  const hasItems = sortedItems.length > 0
  return (
    <>
      <div className="flex justify-between">
        <TabFilter
          items={categoryTabs}
          selectedValue={category}
          onValueChange={onChangeCategory}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select
          name="filter"
          id="filter"
          className="h-9 border border-gray-400 px-2"
          value={sort}
          onChange={(e) => onChangeSort(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="price-high">금액 높은 순</option>
          <option value="price-low">금액 낮은 순</option>
        </select>
      </div>
      {hasItems ? (
        <>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-15 md:grid-cols-3">
            {sortedItems.map((item) => (
              <li key={item.id}>
                <WishListItemCard
                  order={item}
                  onToggleLike={onToggleLikeList}
                />
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
