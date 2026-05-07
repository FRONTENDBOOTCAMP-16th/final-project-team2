import LikeToggleButton from "@/app/mypage/consumer/wishlist/components/LikeToggleButton";
import Link from "next/link";
import Image from "next/image";
import { ProductLikeWithProduct } from "./WishListItemsList";

interface Props {
  order: ProductLikeWithProduct;
  onRemove: (id: string) => void;
}

export default function WishListItemCard({ order, onRemove }: Props) {
  return (
    <div key={order.id} className="flex flex-col">
      <Link
        href={`/products/writing/${order.products.id}`}
        className="relative flex flex-col transition-transform duration-400 hover:scale-105"
      >
        {order.products.discount_rate > 0 && (
          <div className="absolute top-0 left-0  bg-[#DC2626] text-white px-2 py-1 text-sm font-bold">
            {order.products.discount_rate}%
          </div>
        )}

        <Image
          width={282}
          height={282}
          className="object-fill "
          src={order.products.thumbnail_image}
          alt=""
        />
      </Link>
      <div className="flex flex-col pr-4 pt-4">
        <p className="text-sm text-gray-400 ">
          {order.products.product_categories[0]?.categories.name}
        </p>
        <div className="flex justify-between">
          <p className="font-bold self-center">{order.products.name}</p>
          <LikeToggleButton id={order.id} onRemove={onRemove} />
        </div>

        <div className="flex gap-2">
          {order.products.discount_rate > 0 && (
            <span className="text-red-500 font-bold text-sm">
              {order.products.discount_rate}%
            </span>
          )}
          <span className="font-bold text-sm text-slate-800">
            {order.products.price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
