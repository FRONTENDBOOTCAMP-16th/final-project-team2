import Image from 'next/image'
import { getProductsAll } from '@/api/getProductAll'
import MainMoreDetail from './MainMoreDetail'

interface ProductsNewProps {
  image: string
  title: string
  subtitle: string
}

export default async function ProductsNew({ image, title, subtitle }: ProductsNewProps) {
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
      <h2 className='sr-only'>{title}</h2>
      <p className='sr-only'>{subtitle}</p>
      <Image
        src={image}
        alt=""
        className="w-full object-cover"
        fill
        unoptimized={true}
        priority
      />
      <div className="z-0 m-auto w-full max-w-7xl text-right break-keep">
        <strong className="block font-bold text-white">오늘의 신상품</strong>

        <h3 className="mt-9 text-4xl font-bold text-white">
          {firstProduct.name}
        </h3>

        <MainMoreDetail
          id={firstProduct.id}
          category_path={firstProduct.category_path}
        />
      </div>
    </>
  )
}
