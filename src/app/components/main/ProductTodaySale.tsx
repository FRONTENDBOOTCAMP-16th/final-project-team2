import { ProductWithCategory } from '@/api/getProductAll';
import Image from 'next/image';
import MainMoreDetail from './MainMoreDetail';
import { DiscountPriceFormat, PriceFormat } from '@/utils/supabase/intl';

interface ProductsTodaySaleProps {
  products: ProductWithCategory[]
}

export default function ProductsTodaySale({ products }: ProductsTodaySaleProps) {

  return products.map(item => {
    const priceLocale = PriceFormat(Number(item.price));
    const finalPrice = DiscountPriceFormat(Number(item.price), Number(item.discount_rate))

    return (
      <div key={item.id} className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative h-90">
          <Image src={item.thumbnail_image} alt={`${item.name} 상품 이미지`} className="object-cover" fill sizes="w-full h-full" />
        </div>
        <div className="flex flex-col px-8.5 pbe-8.5 pbs-17 text-left bg-white min-w-0 flex-1">
          <dl className='w-full min-w-0'>
            <dt className="sr-only">상품 카테고리</dt>
            <dd aria-label={`${item.category_name_kr}`} className="text-[#7B7979] font-extrabold">
              {item.category_name_kr}
            </dd>

            <dt className="sr-only">상품명</dt>
            <dd className="text-[#2D3142] font-bold text-3xl mbs-4.5 truncate">{item.name}</dd>
          </dl>

          <dl className="flex flex-wrap items-center flex-1 mbs-4.5">
            <dt className="sr-only">기존 금액</dt>
            <dd className="order-3 line-through text-[#7B7979] w-full h-full">{priceLocale}원</dd>

            <dt className="sr-only">할인율</dt>
            <dd className="order-1 me-2 text-[#FF6B6B] font-black">{item.discount_rate}%</dd>

            <dt className="sr-only">최종금액</dt>
            <dd className="order-2 text-[#2D3142] font-black text-2xl">{finalPrice}원</dd>
          </dl>

          <div>
            <MainMoreDetail id={item.id} category_path={item.category_path} />
          </div>
        </div>
      </div>
    );
  });
}
