import { ProductWithCategory } from '@/api/getProductAll'
import Image from 'next/image'
import MainMoreDetail from './MainMoreDetail'
import { DiscountPriceFormat, PriceFormat } from '@/utils/intl'
import { mainCategories } from '@/app/(shop)/products/[mainCategory]/lib/category'

interface ProductsTodaySaleProps {
  products: ProductWithCategory[]
}

export default function ProductsTodaySale({
  products,
}: ProductsTodaySaleProps) {
  return products.map((item, i) => {
    const priceLocale = PriceFormat(Number(item.price))
    const finalPrice = DiscountPriceFormat(
      Number(item.price),
      Number(item.discount_rate),
    )

    return (
      <div 
        key={item.id} 
        className="group flex flex-1 overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20"
      >
        <div className="relative h-90 flex-1 rounded-l-3xl overflow-hidden">
          <Image
            src={item.thumbnail_image}
            alt={`${item.name} 상품 이미지`}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            fill
            sizes="w-full h-full"
          />
          {/* 호버 시 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* 할인 뱃지 */}
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-soft">
            {item.discount_rate}% OFF
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-r-3xl bg-gradient-to-br from-muted to-card px-8.5 pbs-17 pbe-8.5 text-left relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full" />
          <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-secondary/10 rounded-full" />
          
          <dl className="w-full min-w-0 relative z-10">
            <dt className="sr-only">상품 카테고리</dt>
            <dd
              aria-label={`${item.category_name_kr}`}
              className="font-semibold text-primary text-sm uppercase tracking-wide"
            >
              {item.category_name_kr}
            </dd>

            <dt className="sr-only">상품명</dt>
            <dd className="mbs-4.5 truncate text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {item.name}
            </dd>
          </dl>

          <dl className="mbs-4.5 flex flex-1 flex-wrap items-center relative z-10">
            <dt className="sr-only">기존 금액</dt>
            <dd className="order-3 h-full w-full text-muted-foreground line-through text-sm">
              {priceLocale}원
            </dd>

            <dt className="sr-only">할인율</dt>
            <dd className="order-1 me-3 text-2xl font-black text-primary">
              {item.discount_rate}%
            </dd>

            <dt className="sr-only">최종금액</dt>
            <dd className="order-2 text-3xl font-black text-foreground">
              {finalPrice}원
            </dd>
          </dl>

          <div className="relative z-10">
            <MainMoreDetail id={item.id} category_path={mainCategories[i]} />
          </div>
        </div>
      </div>
    )
  })
}
