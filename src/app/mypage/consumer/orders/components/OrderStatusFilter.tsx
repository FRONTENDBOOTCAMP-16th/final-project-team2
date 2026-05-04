import { statusLabel } from "@/data/statusLabel";
import { ChangeEvent } from "react";

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
    <div className="flex flex-col gap-4 px-2 py-5">
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="text-sm text-gray-500 font-medium">
          배송 상태:
        </label>
        <select
          name="filter"
          id="filter"
          onChange={handleStatusChange}
          value={value}
          className="border-none bg-transparent text-sm font-medium focus:ring-0 cursor-pointer"
        >
          <option value="">전체 상태</option>
          {STATUS_LIST.map((status) => (
            <option key={status} value={status}>
              {statusLabel[status].label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
