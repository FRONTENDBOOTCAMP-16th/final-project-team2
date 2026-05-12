import { ProductWithCategory } from '@/api/getProductAll'
import Image from 'next/image'
import MainMoreDetail from './MainMoreDetail'
import { DiscountPriceFormat, PriceFormat } from '@/utils/supabase/intl'

interface ProductsTodaySaleProps {
  products: ProductWithCategory[]
}

export default function ProductsTodaySale({
  products,
}: ProductsTodaySaleProps) {
  return products.map((item) => {
    const priceLocale = PriceFormat(Number(item.price))
    const finalPrice = DiscountPriceFormat(
      Number(item.price),
      Number(item.discount_rate),
    )

    return (
      <div key={item.id} className="flex flex-1 overflow-hidden">
        <div className="relative h-90 flex-1">
          <Image
            src={item.thumbnail_image}
            alt={`${item.name} 상품 이미지`}
            className="object-cover"
            fill
            sizes="w-full h-full"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-white px-8.5 pbs-17 pbe-8.5 text-left">
          <dl className="w-full min-w-0">
            <dt className="sr-only">상품 카테고리</dt>
            <dd
              aria-label={`${item.category_name_kr}`}
              className="font-extrabold text-[#7B7979]"
            >
              {item.category_name_kr}
            </dd>

            <dt className="sr-only">상품명</dt>
            <dd className="mbs-4.5 truncate text-3xl font-bold text-[#2D3142]">
              {item.name}
            </dd>
          </dl>

          <dl className="mbs-4.5 flex flex-1 flex-wrap items-center">
            <dt className="sr-only">기존 금액</dt>
            <dd className="order-3 h-full w-full text-[#7B7979] line-through">
              {priceLocale}원
            </dd>

            <dt className="sr-only">할인율</dt>
            <dd className="order-1 me-2 font-black text-[#FF6B6B]">
              {item.discount_rate}%
            </dd>

            <dt className="sr-only">최종금액</dt>
            <dd className="order-2 text-2xl font-black text-[#2D3142]">
              {finalPrice}원
            </dd>
          </dl>

          <div>
            <MainMoreDetail id={item.id} category_path={item.category_path} />
          </div>
        </div>
      </div>
    )
  })
}
