import { getCarts } from "@/actions/cartAction"
import TotalPriceBox from "./_components/TotalPriceBox"
import AddressSection from "./_components/AddressSection"
import { getLocationUserInfo, submitPayment } from "@/actions/paymentAction"
import { CreditCard, BanknoteArrowUp } from "lucide-react"
import type { UserInfo } from "@/types/orders"
import { redirect } from 'next/navigation'


export default async function Payment() {
  const cart = await getCarts()
  const userInfo = await getLocationUserInfo() as UserInfo

  if (!Array.isArray(cart) || cart.length === 0) {
    redirect('/cart')
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
      <form id="payment-form" action={submitPayment} className="w-full flex flex-col gap-6">

        {/* --- 주문자 정보 영역 --- */}
        <fieldset className="flex flex-col gap-3">
          <AddressSection userInfo={userInfo} />
        </fieldset>

        {/* --- 결제 방식 선택 영역 --- */}
        <fieldset className="flex gap-2">
          <legend className="sr-only">결제 방식 선택</legend>

          <label className="flex flex-col items-center justify-center w-full p-4 border rounded cursor-pointer hover:text-gray-500 focus-within:ring-2 focus-within:ring-gray-500 text-center">
            <input type="radio" name="paymentMethod" value="PAID" className="sr-only" required />
            <CreditCard aria-hidden="true" size={36} />
            <span className="font-bold text-lg mt-2">신용/체크카드</span>
            <span className="text-sm opacity-70">모든 카드 결제 가능</span>
          </label>

          <label className="flex flex-col items-center justify-center w-full p-4 border rounded cursor-pointer hover:text-gray-500 focus-within:ring-2 focus-within:ring-gray-500 text-center">
            <input type="radio" name="paymentMethod" value="PENDING" className="sr-only" required />
            <BanknoteArrowUp aria-hidden="true" size={36} />
            <span className="font-bold text-lg mt-2">무통장 입금</span>
            <span className="text-sm opacity-70">계좌이체 결제</span>
          </label>
        </fieldset>
      </form>

      <aside className="w-1/3 min-w-75">
        <TotalPriceBox
          cart={cart}
          totalOriginPrice={totalOriginPrice}
          totalDiscountedPrice={totalDiscountedPrice}
        />
      </aside>
    </div>
  )
}