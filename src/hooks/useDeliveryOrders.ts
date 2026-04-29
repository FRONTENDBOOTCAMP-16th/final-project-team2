import { dummyOrderItems } from "@/data/dummyOrder";
import { useMemo, useState } from "react";

type SortType = "All" | "latest" | "oldest" | "highPrice" | "lowPrice";
type SalesStatus = "PAID" | "SHIPPED" | "DELIVERED";

interface Category {
  id: string;
  label: string;
  sort: SortType;
}
const ALLOWED_STATUS: SalesStatus[] = ["PAID", "SHIPPED", "DELIVERED"] as const;

export default function useDeliveryOrders(myProductIds: string[]) {
  const [sortType, setSortType] = useState<SortType>("latest");

  const myOrders = useMemo(() => {
    return dummyOrderItems
      .filter(
        (item) =>
          myProductIds.includes(item.productId) &&
          ALLOWED_STATUS.includes(item.itemStatus as SalesStatus),
      )
      .map((item) => ({
        ...item,
        orderTime: new Date(item.orderDate).getTime(),
      }));
  }, [myProductIds]);

  // 2. 탭 = 정렬 변경
  const handleTabChange = (id: string, categories: readonly Category[]) => {
    const selectedTab = categories.find((tab) => tab.id === id);

    if (selectedTab) {
      setSortType(selectedTab.sort);
    }
  };

  // 3. 정렬만 존재 (필터 제거)
  const sortedOrders = useMemo(() => {
    if (sortType === "All") {
      return myOrders;
    }
    return myOrders.toSorted((a, b) => {
      switch (sortType) {
        case "latest":
          return b.orderTime - a.orderTime;

        case "oldest":
          return a.orderTime - b.orderTime;

        case "highPrice":
          return b.unitPrice - a.unitPrice;

        case "lowPrice":
          return a.unitPrice - b.unitPrice;

        default:
          return 0;
      }
    });
  }, [myOrders, sortType]);

  return {
    sortType,
    handleTabChange,
    sortedOrders,
  };
}
