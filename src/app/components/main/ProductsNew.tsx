import Image from 'next/image'
import { getProductsAll } from '@/api/getProductAll'
import MainMoreDetail from './MainMoreDetail'

interface ProductsNewProps {
  image: string
}

export default async function ProductsNew({ image }: ProductsNewProps) {
  const { products } = await getProductsAll({
    page: 1,
    pageSize: 1,
  })

  if (!products || products.length === 0) {
    return <p>추천 상품이 없습니다.</p>
  }

  const firstProduct = products[0]

  return (
    <>
      <Image
        src={image}
        alt=""
        className="w-full object-cover rounded-3xl"
        fill
        unoptimized={true}
      />
      <div className="z-0 m-auto w-full max-w-7xl text-right break-keep px-8">
        <span className="inline-block bg-secondary text-foreground px-4 py-2 rounded-full font-semibold text-sm mb-4">오늘의 신상품</span>

        <p className="mt-4 text-4xl font-bold text-white drop-shadow-lg">
          {firstProduct.name}
        </p>

        <MainMoreDetail
          id={firstProduct.id}
          category_path={firstProduct.category_path}
        />
      </div>
    </>
  )
}
