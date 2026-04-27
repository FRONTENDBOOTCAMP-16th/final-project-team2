import { dummyOrders } from "@/data/dummyOrder";
import Image from "next/image";
import Link from "next/link";
import LikeToggleButton from "../../../../components/common/LikeToggleButton";

const MAX_COUNT = 9;
const CATEGORY_TO_KOREAN: { writing: string; paper: string } = {
  writing: "필기구",
  paper: "노트/메모",
};

export default function WishListItemsList() {
  const wishlistItem = dummyOrders.slice(0, MAX_COUNT);
  return wishlistItem.map((item) => (
    <div key={item.id} className="flex flex-col">
      <Link
        href={`/products/pen/${item.id}`}
        className="relative flex flex-col"
      >
        {item.discountRate > 0 && (
          <div className="absolute top-0 left-0  bg-[#FF6B6B] text-white px-2 py-1 text-sm font-bold">
            {item.discountRate}%
          </div>
        )}

        <Image
          width={282}
          height={282}
          className="object-fill"
          src={item.image}
          alt=""
        />
      </Link>
      <div className="flex flex-col gap-2 pr-4 pt-4">
        <h2 className="mt-2">{item.name}</h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-400">
            {CATEGORY_TO_KOREAN[item.category]}
          </p>

          <LikeToggleButton />
        </div>

        <div className="flex gap-2">
          {item.discountRate > 0 && (
            <span className="text-red-500 font-bold text-sm">
              {item.discountRate}%
            </span>
          )}
          <span className="font-bold text-sm text-slate-800">
            {item.price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  ));
}
