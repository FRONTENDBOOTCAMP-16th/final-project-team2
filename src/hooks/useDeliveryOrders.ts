import { OrderItem } from '@/app/mypage/types/orderItem'
import { useMemo, useState } from 'react'

// 탭에서 선택되는 정렬 기준을 정의한 타입 지정
type SortType = 'All' | 'latest' | 'oldest' | 'highPrice' | 'lowPrice'

// 배송 관리에 포함할 주문 상태 타입 지정
// type SalesStatus = "PAID" | "SHIPPED" | "DELIVERED"

// 탭 UI 하나를 표현하는 데이터 구조
interface Category {
  id: string
  label: string
  sort: SortType
}

export default function useDeliveryOrders(items: OrderItem[]) {
  const [sortType, setSortType] = useState<SortType>('All')

  // 1. 데이터 추출
  // 조건에 맞는 데이터 배열 새로 만들기
  const myOrders = useMemo(() => {
    // items가 변경될 때만 필터링 + 변환 다시 실행
    // 필터링한 데이터를 map을 사용하여 새로운 배열 반환 (주문 날짜는 숫자로 변환)
    return items.map((item) => ({
      ...item,
      orderTime: new Date(item.orders.created_at).getTime(),
    }))
  }, [items])

  // 2. 데이터 가공
  // 해당 탭에 따라서 데이터 정렬해주는 핸들러 함수 만들기
  const handleTabChange = (id: string, categories: readonly Category[]) => {
    // 카테고리 아이디와 일치하는 탭 아이디 찾기
    const selectedTab = categories.find((tab) => tab.id === id)

    // 만약 선택된 탭이 일치한다면, 선택한 탭에 맞는 sort 값을 찾아서 내부 상태(sortType)를 변경
    if (selectedTab) {
      setSortType(selectedTab.sort)
    }
  }

  //3. 데이터 정렬
  // 탭 종류에 따라 해당 데이터 키값을 반환해주는 함수
  // sortType에 따라 myOrders 정렬해서 반환
  const sortedOrders = useMemo(() => {
    if (sortType === 'All') {
      return myOrders
    }
    return myOrders.toSorted((a, b) => {
      switch (sortType) {
        case 'latest':
          return b.orderTime - a.orderTime

        case 'oldest':
          return a.orderTime - b.orderTime

        case 'highPrice':
          return (
            b.unit_price * (1 - b.products.discount_rate / 100) -
            a.unit_price * (1 - a.products.discount_rate / 100)
          )
        case 'lowPrice':
          return (
            a.unit_price * (1 - a.products.discount_rate / 100) -
            b.unit_price * (1 - b.products.discount_rate / 100)
          )

        default:
          return 0
      }
    })
  }, [myOrders, sortType])

  return {
    sortType,
    handleTabChange,
    sortedOrders,
  }
}
