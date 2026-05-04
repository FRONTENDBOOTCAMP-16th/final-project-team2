import LikeToggleButton from "@/app/components/common/LikeToggleButton";
import Link from "next/link";
import Image from "next/image";
import { OrderItem } from "@/app/mypage/types/orderItem";

const CATEGORY_TO_KOREAN: { writing: string; paper: string } = {
  writing: "필기구",
  paper: "노트/메모",
};

export default function WishListItemCard({ order }: { order: OrderItem }) {
  return (
    <div key={order.id} className="flex flex-col">
      <Link
        href={`/products/pen/${order.id}`}
        className="relative flex flex-col"
      >
        {order.discountRate > 0 && (
          <div className="absolute top-0 left-0  bg-[#DC2626] text-white px-2 py-1 text-sm font-bold">
            {order.discountRate}%
          </div>
        )}

        <Image
          width={282}
          height={282}
          className="object-fill"
          src={order.image}
          alt=""
        />
      </Link>
      <div className="flex flex-col pr-4 pt-4">
        <p className="text-sm text-gray-400 ">
          {CATEGORY_TO_KOREAN[order.category]}
        </p>
        <div className="flex justify-between">
          <p className="font-bold self-center">{order.name}</p>
          <LikeToggleButton />
        </div>

        <div className="flex gap-2">
          {order.discountRate > 0 && (
            <span className="text-red-500 font-bold text-sm">
              {order.discountRate}%
            </span>
          )}
          <span className="font-bold text-sm text-slate-800">
            {order.unitPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
