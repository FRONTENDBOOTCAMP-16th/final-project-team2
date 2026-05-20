import Image from 'next/image'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { DiscountPriceFormat } from '@/utils/intl'

interface CardProps {
  product: SellerProduct
  onEdit: () => void
}

export default function SellerProductItemCard({ product, onEdit }: CardProps) {
  const statusConfig = {
    ON_SALE: { label: '판매중', stateStyles: 'bg-[#00C37E] text-white' },
    SOLD_OUT: { label: '품절', stateStyles: 'bg-gray-400 text-white' },
    PREPARING: { label: '준비중', stateStyles: 'bg-red-500 text-white' },
    HIDDEN: { label: '판매중단', stateStyles: 'bg-red-500 text-white' },
  }

  const current = statusConfig[product.status as keyof typeof statusConfig] ?? {
    label: '상태 미지정',
    stateStyles: 'bg-gray-300 text-white',
  }

  return (
    <div className="flex flex-row items-center gap-x-4 border-b border-gray-100 px-6 py-8 text-sm font-medium transition-colors hover:bg-gray-50">
      <div className="flex w-2/5 items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-gray-100">
          <Image
            fill
            className="object-cover"
            src={product.thumbnail_image}
            alt={product.name}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/fallback.png'
            }}
          />
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span
            className={`shrink-0 rounded-sm px-2 py-0.5 text-[10px] ${current.stateStyles}`}
          >
            {current.label}
          </span>
          <p className="truncate text-gray-900">{product.name}</p>
        </div>
      </div>

      <p className="w-[12%] text-center text-gray-500">
        {product.price.toLocaleString()}원
      </p>
      <p className="w-[12%] text-center font-bold text-gray-900">
        {DiscountPriceFormat(product.price, product.discount_rate)}원
      </p>
      <p className="w-[12%] text-center text-gray-600">
        {product.discount_rate}%
      </p>
      <p className="w-[12%] text-center text-gray-600">
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
