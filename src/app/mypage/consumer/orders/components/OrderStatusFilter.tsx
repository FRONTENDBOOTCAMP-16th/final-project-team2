import type { OrderItem } from "@/types/orderItem";
import { ChangeEvent } from "react";

// 주문 상태 더미 데이터 넣기
const STATUS_LIST: OrderItem["status"][] = [
  "결제대기",
  "결제완료",
  "배송중",
  "배송완료",
  "취소됨",
];

interface Props {
  value: string;
  statusChange: (status: string) => void;
}

export default function OrderStatusFilter({ value, statusChange }: Props) {
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    statusChange(e.target.value);
  };
  return (
    <div className="px-2 py-5 pr-10">
      <label htmlFor="filter" className="sr-only">
        주문 조회 필터
      </label>
      <select
        name="filter"
        id="filter"
        onChange={handleStatusChange}
        value={value}
      >
        <option value="">전체 상태</option>
        {STATUS_LIST.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
