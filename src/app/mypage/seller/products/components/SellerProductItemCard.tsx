import Image from 'next/image'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'

interface CardProps {
  product: SellerProduct
  onEdit: () => void
}

export default function SellerProductItemCard({ product, onEdit }: CardProps) {
  const totalPrice = product.price * (1 - product.discount_rate / 100)

  const stateStyles =
    product.state === '판매중'
      ? 'bg-[#00C37E] text-white'
      : 'bg-black text-white'

  return (
    <div className="flex flex-row items-center gap-x-4 border-b border-gray-100 px-6 py-8 text-sm font-medium transition-colors hover:bg-gray-50">
      <div className="flex w-2/5 items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-gray-100">
          <Image
            fill
            className="object-cover"
            src={product.thumbnail_image}
            alt={product.name}
          />
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`shrink-0 px-2 py-0.5 text-[10px] ${stateStyles}`}>
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
        className="h-9 w-16 shrink-0 rounded-md border border-gray-300 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100"
      >
        관리
      </button>
    </div>
  )
}
