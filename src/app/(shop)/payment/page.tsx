import { getCarts } from "@/actions/cartAction"
import TotalPriceBox from "./_components/TotalPriceBox"
import AddressSection from "./_components/AddressSection"
import { getLocationUserInfo, submitPayment } from "@/actions/paymentAction"
import type { UserInfo } from "@/types/orders"
import { redirect } from 'next/navigation'
import PaymentSelector from "./_components/PaymentSeletor"


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
    <div className="max-w-7xl mx-auto py-6">
      <form id="payment-form" action={submitPayment} method="POST" className="flex gap-6">
        <div className="w-full flex flex-col gap-6">

          {/* 주문영역 */}
          <fieldset className="flex flex-col gap-3">
            <AddressSection userInfo={userInfo} />
          </fieldset>

          {/* 결제방식 */}
          <PaymentSelector />
        </div>

        <aside className="w-1/3 min-w-75">
          <TotalPriceBox
            cart={cart}
            totalOriginPrice={totalOriginPrice}
            totalDiscountedPrice={totalDiscountedPrice}
          />
        </aside>
      </form>
    </div>
  )
}