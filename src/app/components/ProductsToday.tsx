import { LucideSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string
  name: string
  category: string
  price: number
  discount_rate: number
  thunmbnail_image: string
  updated_at: string
}

interface ProductsProps {
  products: Product[]
  image: string
}


export default function ProductTodayList({ products, image }: ProductsProps) {
  const latestProduct = products && products.length > 0 ? products.toSorted((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0] : null

  if(!latestProduct) return

  return (
    <>
      <Image
        src={image}
        alt=""
        className="w-full object-cover"
        fill
        unoptimized={true} 
      />
      <div className="w-full max-w-7xl m-auto break-keep z-0 text-right"> 
        <strong className="block text-white font-bold">
          오늘의 신상품
        </strong>
        
        <p className="text-4xl font-bold text-white mt-9">
          {latestProduct.name}
        </p>

        <Link href={`/products/${latestProduct.category}/${latestProduct.id}`} className="inline-flex mt-9 px-8 py-3 text-white font-bold bg-[#FF6B6B] cursor-pointer rounded-2xl">
          <LucideSearch className="me-2.5"/>
          자세히 보기
        </Link>
      </div>
    </>
  )
}