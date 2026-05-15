import PaymentSubmitButton from './PaymentSubmitButton'
interface CartItem {
  id: string
  product_id: string
  quantity: number
  selected_options?: Record<string, string | number> | null
  product?: {
    name: string
    price: number
    thumbnail_image?: string | null
    options?: Record<string, unknown> | null
    discount_rate?: number | null
  } | null
}

interface PriceBoxProps {
  cart: CartItem[]
  totalOriginPrice: number
  totalDiscountedPrice: number
}

export default function TotalPriceBox({ cart, totalOriginPrice, totalDiscountedPrice }: PriceBoxProps) {
  const totalDiscountAmount = totalOriginPrice - totalDiscountedPrice

  return (
    <section aria-labelledby="summary-heading" className="pl-6">
      <h2 id="summary-heading" className="font-bold mb-6 text-2xl">결제 금액 요약</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-100">구매 상품 목록</h3>
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => {
            const product = item.product
            const productPrice = product?.price ?? 0
            const discountRate = product?.discount_rate ?? 0
            const itemFinalPrice = (productPrice * (1 - discountRate / 100)) * item.quantity

            // 옵션이 {"option": "value"}이기에 준비
            const selectedOptionsEntries = item.selected_options ? Object.entries(item.selected_options) : []

            return (
              <li key={item.id} className="flex flex-col border-b border-gray-50 pb-2 last:border-0">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-800 truncate w-2/3 dark:text-gray-200">
                    {product?.name ?? '상품 정보 없음'}
                  </span>
                  <span className="text-gray-500 shrink-0 dark:text-gray-200">
                    {item.quantity}개
                  </span>
                </div>

                {selectedOptionsEntries.length > 0 && (
                  <div className="text-xs text-gray-400 mt-0.5">
                    {selectedOptionsEntries.map(([key, value], idx) => (
                      <span key={key}>
                        {key}: {String(value)}{idx < selectedOptionsEntries.length - 1 ? ' / ' : ''}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    {itemFinalPrice.toLocaleString()}원
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-dashed my-4" />

      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400">상품금액</dt>
          <dd className="font-medium">{totalOriginPrice.toLocaleString()}원</dd>
        </div>
        <div className="flex justify-between text-red-500">
          <dt>할인금액</dt>
          <dd>-{totalDiscountAmount.toLocaleString()}원</dd>
        </div>
        <div className="border-t my-4" />
        <div className="flex justify-between items-center text-xl font-bold">
          <dt>총 결제금액</dt>
          <dd className="text-blue-600">{totalDiscountedPrice.toLocaleString()}원</dd>
        </div>
      </dl>

      <PaymentSubmitButton />
    </section>
  )
}