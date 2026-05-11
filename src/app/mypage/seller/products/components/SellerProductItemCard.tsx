import Image from "next/image";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";

interface CardProps {
  product: SellerProduct;
  onEdit: () => void;
}

export default function SellerProductItemCard({ product, onEdit }: CardProps) {
  const totalPrice = product.price * (1 - product.discount_rate / 100);

  const stateStyles =
    product.state === "판매중"
      ? "bg-[#00C37E] text-white"
      : "bg-[#FF6B6B] text-white";

  return (
    <div className="flex flex-row gap-x-4 px-6 py-8 items-center text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center w-2/5 gap-4">
        <div className="relative w-20 h-20 shrink-0 bg-gray-100 overflow-hidden ">
          <Image
            fill
            className="object-cover"
            src={product.thumbnail_image}
            alt={product.name}
          />
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`px-2 py-0.5 text-[10px] shrink-0 ${stateStyles}`}>
            {product.state}
          </span>
          <p className="truncate">{product.name}</p>
        </div>
      </div>

      <p className="w-[12%] text-center">{product.price.toLocaleString()}원</p>
      <p className="w-[12%] text-center font-semibold">
        {totalPrice.toLocaleString()}원
      </p>
      <p className="w-[12%] text-center">{product.discount_rate}%</p>
      <p className="w-[12%] text-center">
        {product.inventory.toLocaleString()}
      </p>

      <button
        onClick={onEdit}
        className="w-16 h-9 shrink-0 border border-gray-300 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
      >
        관리
      </button>
    </div>
  );
}
