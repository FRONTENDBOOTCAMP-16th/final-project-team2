import { getCarts } from "@/actions/cartAction"
import QuantityComponent from "./_components/Quantity"
import Image from "next/image"
import PriceBox from "./_components/PriceBox"
import CartDeleteButton from "./_components/CartDeleteButton"

export default async function CartList() {

  const cart = await getCarts()

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div>
        <p>장바구니가 비었어요!</p>
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
    <div className="flex">
      <ul className="w-2/3">
        {cart.map((item) => (
          <li key={item.id} className="flex items-start gap-4 p-4 bg-white relative">
            {/* 상품 이미지 */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={item.product?.thumbnail_image || ''}
                alt={item.product?.name || ''}
                fill
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
                      <span key={key} className="py-0.5 rounded-full text-xs">
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
            <CartDeleteButton />

          </li>
        ))}
      </ul>

      <div className="w-1/3">
        <PriceBox
          totalOriginPrice={totalOriginPrice}
          totalDiscountedPrice={totalDiscountedPrice}
        />
      </div>
    </div>
  )
}
