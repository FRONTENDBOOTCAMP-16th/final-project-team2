import { Star } from 'lucide-react'
import { Products } from '@/app/lib/products'

interface Props {
  products: Products
}

const ProductSummary = ({ products }: Props) => {
  const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`

  return (
    <>
      <dl className="space-y-3">
        <dt className="sr-only">제품 타입</dt>
        <dd className="text-lg text-gray-600">{'메인카테고리'}</dd>

        <dt className="sr-only">제품명</dt>
        <dd className="text-3xl font-semibold">{products.name}</dd>
      </dl>
      <dl className="flex">
        <dt className="sr-only">평점</dt>
        <dd className="flex">
          <Star fill="#FDC700" className="text-[#FDC700]" />
          <Star fill="#FDC700" className="text-[#FDC700]" />
          <Star fill="#FDC700" className="text-[#FDC700]" />
          <Star fill="#FDC700" className="text-[#FDC700]" />
          <Star className="text-gray-200" />
          <span className="ml-2">4.5점</span>
        </dd>

        <dt className="sr-only">리뷰 개수</dt>
        <dd>(1,334개 리뷰)</dd>
      </dl>

      <div>
        <dl className="mt-9 flex items-center gap-2">
          <dt className="sr-only">정가</dt>
          <dd className="order-2">
            <del className="text-lg text-gray-500">
              {formatPrice(products.price)}
            </del>
          </dd>

          <dt className="sr-only">할인가</dt>
          <dd className="order-1 text-2xl font-semibold">
            {formatPrice(
              Math.ceil(products.price * (1 - products.discount_rate / 100)),
            )}
          </dd>
        </dl>
        <div className="discountBadge mt-2 flex h-7 w-20.5 items-center justify-center bg-[#ff6b6b] pt-1 pr-3 pb-1 pl-3">
          <p className="text-white">{products.discount_rate}%</p>
        </div>
      </div>
    </>
  )
}

export default ProductSummary
