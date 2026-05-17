import { getCarts } from '@/actions/cartAction'
import QuantityComponent from './_components/Quantity'
import PriceBox from './_components/PriceBox'
import CartDeleteButton from './_components/CartDeleteButton'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

import ProductImage from '../products/[mainCategory]/_components/ProductImage'

export default async function CartList() {
  const cart = await getCarts()

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="flex h-full min-h-180 w-full flex-col items-center justify-center gap-4">
        <p className="text-8xl">
          <ShoppingBag size={96} />
        </p>
        <p className="text-2xl font-bold">장바구니가 비었어요!</p>
      </div>
    )
  }

  const totalOriginPrice = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0,
  )

  const totalDiscountedPrice = cart.reduce((acc, item) => {
    const price = item.product?.price || 0
    const discountRate = item.product?.discount_rate || 0
    return acc + price * (1 - discountRate / 100) * item.quantity
  }, 0)

  return (
    <div className="mx-auto flex max-w-7xl gap-6 py-6">
      <ul className="w-full">
        {cart.map((item) => (
          <li key={item.id} className="relative flex items-start gap-4 p-4">
            {/* 상품 이미지 */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-24 sm:w-24">
              <ProductImage
                priority
                src={item.product?.thumbnail_image || ''}
                alt={item.product?.name || ''}
              />
            </div>

            {/* 상품 정보 및 수량 조절 */}
            <div className="flex grow flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="space-y-1">
                <p className="text-lg font-semibold">{item.product?.name}</p>

                {/* 옵션 */}
                {item.selected_options && (
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {Object.entries(item.selected_options).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="rounded-full py-0.5 text-xs dark:text-gray-300"
                        >
                          {key}: {String(value)}
                        </span>
                      ),
                    )}
                  </div>
                )}

                {/* 수량 */}
                <QuantityComponent
                  cartItemId={item.id}
                  initialQuantity={item.quantity}
                />

                {/* 가격 */}
                <p className="flex items-center gap-2">
                  <del className="text-gray-400">
                    {(
                      (item.product?.price || 0) * item.quantity
                    ).toLocaleString()}
                    원
                  </del>
                  <span className="font-bold text-blue-600">
                    {(
                      (item.product?.price || 0) *
                      item.quantity *
                      (1 - (item.product?.discount_rate || 0) / 100)
                    ).toLocaleString()}
                    원
                  </span>
                </p>
              </div>
            </div>

            {/* 삭제버튼 */}
            <CartDeleteButton deleteId={item.id} />
          </li>
        ))}
      </ul>

      <div className="w-1/3 min-w-75 pl-6">
        <PriceBox
          totalOriginPrice={totalOriginPrice}
          totalDiscountedPrice={totalDiscountedPrice}
        />
        <Link
          className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-md bg-black py-4 font-bold text-white"
          href="/payment"
        >
          결제하기
        </Link>
      </div>
    </div>
  )
}
