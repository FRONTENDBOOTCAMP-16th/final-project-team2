import LikeToggleButton from "@/app/mypage/consumer/wishlist/components/LikeToggleButton";
import Link from "next/link";
import Image from "next/image";
import { ProductLikeWithProduct } from "@/app/lib/productLike";
import { CATEGORY_GROUPS } from "../lib/categoryGroup";

interface Props {
  order: ProductLikeWithProduct;
  onRemove: (id: string) => void;
}

export default function WishListItemCard({ order, onRemove }: Props) {
  const categoryName =
    order.products.product_categories[0]?.categories.name ?? "";

  const categoryId = CATEGORY_GROUPS.find((group) =>
    group.categories.includes(categoryName),
  )?.id;

  const productId = order.products.id;

  return (
    <div key={order.id} className="flex flex-col">
      <Link
        href={{
          pathname: `/products/${categoryId}/${productId}`,
        }}
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
      <div className="flex flex-col  pt-4">
        <p className="text-sm text-gray-400 ">
          {order.products.product_categories[0]?.categories.name}
        </p>
        <div className="flex justify-between">
          <p className="font-bold self-center w-50 truncate">
            {order.products.name}
          </p>
          <LikeToggleButton id={order.id} onRemove={onRemove} />
        </div>

        <div className="flex gap-2">
          {order.products.discount_rate > 0 && (
            <span className="text-red-500 font-bold text-sm">
              {order.products.discount_rate}%
            </span>
          )}
          <span className="font-bold text-sm text-slate-800">
            {(
              order.products.price *
              (1 - order.products.discount_rate / 100)
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
    </div>
  );
}
