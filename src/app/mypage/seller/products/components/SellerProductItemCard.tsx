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
  const displayName =
    product.name.length > 18 ? `${product.name.slice(0, 18)}...` : product.name

  return (
    <div className="flex flex-col items-center border-b border-gray-100 text-sm font-medium transition-colors hover:bg-gray-50 md:grid md:grid-cols-[4fr_1fr_1fr_1fr_1fr_72px] md:gap-x-4 md:px-6 md:py-8">
      <div className="flex h-full w-full flex-col items-center gap-4 md:flex-row">
        <div className="relative h-50 w-50 shrink-0 overflow-hidden rounded-sm bg-gray-100 md:h-20 md:w-20">
          <Image
            fill
            className="object-cover"
            src={product.thumbnail_image}
            alt={product.name}
            sizes="80px"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/fallback.png'
            }}
          />
        </div>
        <div className="flex min-w-0 items-center gap-2 md:overflow-hidden">
          <span
            className={`shrink-0 rounded-sm px-2 py-0.5 text-[10px] ${current.stateStyles}`}
          >
            {current.label}
          </span>
          <p className="min-w-0 truncate text-gray-900">{displayName}</p>
          <button
            onClick={onEdit}
            className="ml-auto h-8 w-14 shrink-0 rounded-md border border-gray-300 text-xs font-semibold text-gray-600 md:hidden"
          >
            관리
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3 md:contents">
        <span className="w-16 text-left text-gray-500 md:hidden">판매가</span>
        <p className="text-gray-500 md:text-center">
          {product.price.toLocaleString()}원
        </p>
      </div>
      <div className="flex flex-row justify-between gap-3 md:contents">
        <span className="w-16 text-left text-gray-500 md:hidden">총가격</span>
        <p className="text-center font-bold text-gray-900 md:whitespace-normal">
          {DiscountPriceFormat(product.price, product.discount_rate)}원
        </p>
      </div>
      <div className="flex flex-row justify-between gap-5 md:contents">
        <span className="w-16 text-left text-gray-500 md:hidden">할인율</span>
        <p className="text-center text-gray-600 md:whitespace-normal">
          {product.discount_rate}%
        </p>
      </div>
      <div className="flex flex-row justify-between gap-5 md:contents">
        <span className="w-16 text-left text-gray-500 md:hidden">재고</span>
        <p className="text-center text-gray-600">
          {product.inventory.toLocaleString()}
        </p>
      </div>

      <button
        onClick={onEdit}
        className="hidden h-9 w-16 shrink-0 rounded-md border border-gray-300 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 md:block"
      >
        관리
      </button>
    </div>
  )
}
