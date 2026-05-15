import { CreditCard, BanknoteArrowUp } from "lucide-react"

export default function PaymentSelector() {
  return (
    <fieldset className="flex gap-2">
      <legend className="sr-only">결제 방식 선택</legend>

      <label className="flex flex-col items-center justify-center w-full p-4 border rounded cursor-pointer text-gray-400 hover:text-gray-500 focus-within:ring-2 focus-within:ring-gray-500 text-center has-checked:border-black-600 has-checked:border-2 has-checked:text-black dark:has-checked:text-gray-200">
        <input type="radio" name="paymentMethod" value="PAID" className="sr-only" required />
        <CreditCard aria-hidden="true" size={36} />
        <span className="font-bold text-lg mt-2">신용/체크카드</span>
        <span className="text-sm opacity-70">모든 카드 결제 가능</span>
      </label>

      <label className="flex flex-col items-center justify-center w-full p-4 border rounded cursor-pointer text-gray-400 hover:text-gray-500 focus-within:ring-2 focus-within:ring-gray-500 text-center has-checked:border-black-600 has-checked:border-2 has-checked:text-black dark:has-checked:text-gray-200">
        <input type="radio" name="paymentMethod" value="PENDING" className="sr-only" required />
        <BanknoteArrowUp aria-hidden="true" size={36} />
        <span className="font-bold text-lg mt-2">무통장 입금</span>
        <span className="text-sm opacity-70">계좌이체 결제</span>
      </label>
    </fieldset>
  )
}