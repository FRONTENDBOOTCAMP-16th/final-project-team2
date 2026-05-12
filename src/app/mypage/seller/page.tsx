import dummySellerProducts from '@/data/dummySellerProducts.json'
import SellerProductsList from './products/components/SellerProductItemList'
import { SellerProduct } from '../types/sellerOrderItems'

const HASPRODUCTS = dummySellerProducts.length > 0
const MAX_CONTENT = 5
const products = dummySellerProducts as SellerProduct[]

export default function SellerPage() {
  return (
    <section className="mb-11.25 flex w-full flex-col gap-4 bg-white p-6">
      <h1 className="sr-only">나의 상품</h1>
      {HASPRODUCTS ? (
        <SellerProductsList products={products.slice(0, MAX_CONTENT)} />
      ) : (
        <div className="pt-3 text-center text-red-500">
          <p>등록된 상품이 없습니다.</p>
        </div>
      )}
    </section>
  )
}
