import Image from 'next/image';
import { getProductsAll } from '@/api/getProductAll';
import MainMoreDetail from './MainMoreDetail';

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
      <Image src={image} alt="" className="w-full object-cover" fill unoptimized={true} />
      <div className="w-full max-w-7xl m-auto break-keep z-0 text-right">
        <strong className="block text-white font-bold">오늘의 신상품</strong>

        <p className="text-4xl font-bold text-white mt-9">{firstProduct.name}</p>

        <MainMoreDetail id={firstProduct.id} category_path={firstProduct.category_path} />
      </div>
    </>
  );
}
