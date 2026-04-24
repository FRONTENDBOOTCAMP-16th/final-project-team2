import Image from "next/image";

interface Product {
  id: number
  name: string
  created_at: string
}

interface ProductsProps {
  products: Product[]
  image: string
}


export default function ProductTodayList({ products, image }: ProductsProps) {
  const latestProduct = products && products.length > 0 ? [...products].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0] : null

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
      <div className="break-keep z-0 max-w-7xl px-10 w-full m-auto text-right"> 
        <strong className="block text-2xl sm:text-4xl text-white font-bold leading-tight">
          오늘의 신상품
        </strong>
        
        <p className="text-sm sm:text-base text-gray-200 mt-3 sm:mt-4">
          {latestProduct.name}
        </p>
      </div>
    </>
  )
}