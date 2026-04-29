import { LucideShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string
  name: string
  category: string
  price: number
  discount_rate: number
  thunmbnail_image: string
}


interface ProductsTodaySaleProps {
  products: ProductProps[]
  maxProducts: number
}

export default function ProductsTodaySale({ maxProducts, products }: ProductsTodaySaleProps) {
  return products.slice(0, maxProducts).map(item => {
    const priceLocale = Number(item.price).toLocaleString()
    const finalPrice = Math.round(Number(item.price) * (1 - (Number(item.discount_rate) / 100))).toLocaleString()

    return (
      <div key={item.id}  className="grid grid-cols-13 bg-white">
        <div className="relative h-90 col-span-6">
          <Image src={item.thunmbnail_image} alt={`${item.name} 상품 이미지`} className="object-cover" fill sizes="w-full h-full"/>
        </div>
        <div className="flex flex-col col-span-7 px-8.5 pbe-8.5 pbs-17 text-left">
          <span aria-label={`${item.category}`} className="text-[#7B7979] font-extrabold">{item.category}</span>
          <strong className="text-[#2D3142] font-bold text-3xl mbs-4.5">{item.name}</strong>

          <div className="flex flex-wrap items-center flex-1 mbs-4.5">
            <span className="order-3 line-through text-[#7B7979] w-full h-full" aria-label={`기존 금액 ${priceLocale}`}>{priceLocale}원</span>
            <span className="order-1 me-2 text-[#FF6B6B] font-black" aria-label={`할인율 ${item.discount_rate}`}>{item.discount_rate}%</span>
            <span className="order-2 text-[#2D3142] font-black text-2xl" aria-label={`최종 금액 ${finalPrice}`}>{finalPrice}원</span>
          </div>

          <div>
            <Link href={`/products/${item.category}/${item.id}`} className="inline-flex px-6 py-2.5 text-white font-bold bg-[#FF6B6B] cursor-pointer rounded-2xl">
              <LucideShoppingCart className="me-2.5"/>
              제품 상세보기
            </Link>
          </div>
        </div>
      </div>
    )
  })
}