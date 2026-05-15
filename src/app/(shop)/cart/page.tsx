import { getCarts } from "@/actions/cartAction"
import QuantityComponent from "./_components/Quantity"
import Image from "next/image"
import PriceBox from "./_components/PriceBox"
import CartDeleteButton from "./_components/CartDeleteButton"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import ProductImage from "../products/[mainCategory]/_components/ProductImage"

export default async function CartList() {

  const cart = await getCarts()

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="w-full h-full min-h-180 gap-4 flex flex-col justify-center items-center">
        <p className="text-8xl"><ShoppingBag size={96} /></p>
        <p className="font-bold text-2xl">장바구니가 비었어요!</p>
      </div>
    )
  }

  const totalOriginPrice = cart.reduce((acc, item) =>
    acc + (item.product?.price || 0) * item.quantity, 0);

  const totalDiscountedPrice = cart.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const discountRate = item.product?.discount_rate || 0;
    return acc + (price * (1 - discountRate / 100) * item.quantity);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto flex gap-6 py-6">
      <ul className="w-full">
        {cart.map((item) => (
          <li key={item.id} className="flex items-start gap-4 p-4 relative">
            {/* 상품 이미지 */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
              <ProductImage
                src={item.product?.thumbnail_image || ''}
                alt={item.product?.name || ''}
              />
            </div>

            {/* 상품 정보 및 수량 조절 */}
            <div className="grow flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-lg">{item.product?.name}</p>


                {/* 옵션 */}
                {item.selected_options && (
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {Object.entries(item.selected_options).map(([key, value]) => (
                      <span key={key} className="py-0.5 rounded-full text-xs  dark:text-gray-300">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}

                {/* 수량 */}
                <QuantityComponent
                  cartItemId={item.id}
                  initialQuantity={item.quantity}
                />

                {/* 가격 */}
                <p className="flex items-center gap-2">
                  <del className=" text-gray-400 ">{((item.product?.price || 0) * item.quantity).toLocaleString()}원</del>
                  <span className=" text-blue-600 font-bold">{((item.product?.price || 0) * item.quantity * (1 - (item.product?.discount_rate || 0) / 100)).toLocaleString()}원</span>
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
        <Link className="flex justify-center items-center w-full mt-6 bg-black text-white py-4 rounded-md font-bold cursor-pointer" href='/payment'>결제하기</Link>
      </div>
    </div>
  )
}
