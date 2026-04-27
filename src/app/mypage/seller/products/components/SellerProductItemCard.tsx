import Image from "next/image";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";

export default function SellerProductItemCard({
  product,
}: {
  product: SellerProduct;
}) {
  const totalPrice = product.price * (1 - product.discount_rate / 100);

  return (
    <div className="flex flex-row gap-x-4 p-4 font-semibold border-b border-gray-300">
      <div className="flex w-3/8">
      <Image
        width={80}
        height={80}
        className="object-fill"
        src={product.thumbnail_image}
        alt=""
      />
      <p>{product.state}</p>
      <p>{product.name}</p>
      </div>
      <p className="w-1/8">{`${product.price.toLocaleString()}원`}</p>
      <p className="w-1/8">{`${totalPrice.toLocaleString()}원`}</p>
      <p className="w-1/8">{`${product.discount_rate}%`}</p>
      <div className="flex w-2/8">
      <p >{`${product.inventory}개`}</p>
      <button className="border">관리</button>
      </div>

    </div>
  );
}
