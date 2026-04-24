import { statusLabel } from "@/data/statusLabel";
import { ChangeEvent } from "react";

// statusLabel 키값 배열로  만들기
const STATUS_LIST = Object.keys(statusLabel) as Array<keyof typeof statusLabel>;


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
            {statusLabel[status].label}
          </option>
        ))}
      </select>
    </div>
  );
}
