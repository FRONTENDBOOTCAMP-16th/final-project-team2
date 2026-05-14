interface SelectedOptions {
  [key: string]: string | number
}

interface CartItem {
  id: string
  quantity: number
  selected_options?: SelectedOptions
  product?: {
    name: string
    price: number
    discount_rate?: number | null
    thumbnail_image?: string | null
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
    <section aria-labelledby="summary-heading" className="pl-6 bg-white">
      <h2 id="summary-heading" className="font-bold mb-6 text-2xl">결제 금액 요약</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">구매 상품 목록</h3>
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => {
            const product = item.product
            const productPrice = product?.price ?? 0
            const discountRate = product?.discount_rate ?? 0 // 안전하게 기본값 0 처리

            // 한 품목의 최종 가격 계산
            const itemFinalPrice = (productPrice * (1 - discountRate / 100)) * item.quantity

            // 옵션 렌더링을 위한 준비
            const selectedOptionsEntries = item.selected_options ? Object.entries(item.selected_options) : []

            return (
              <li key={item.id} className="flex flex-col border-b border-gray-50 pb-2 last:border-0">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-800 truncate w-2/3">
                    {product?.name ?? '상품 정보 없음'}
                  </span>
                  <span className="text-gray-500 shrink-0">
                    {item.quantity}개
                  </span>
                </div>

                {/* 선택 옵션 표시 */}
                {selectedOptionsEntries.length > 0 && (
                  <div className="text-xs text-gray-400 mt-0.5">
                    {selectedOptionsEntries.map(([key, value], idx) => (
                      <span key={key}>
                        {key}: {String(value)}{idx < selectedOptionsEntries.length - 1 ? ' / ' : ''}
                      </span>
                    ))}
                  </div>
                )}

                {/* 상품별 가격 표시 */}
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-semibold text-gray-700">
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
          <dt className="text-gray-600">상품금액</dt>
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

      {/* 값을 보내기 위한 hidden Input */}
      <div>
        <input type="hidden" name="totalOriginPrice" />
        <input type="hidden" name="totalDiscountAmount" />
        <input type="hidden" name="totalDiscountedPrice" />
      </div>

      <button type="submit" form="payment-form" className="w-full mt-6 bg-black text-white py-4 rounded-md font-bold cursor-pointer">
        결제하기
      </button>
    </section>
  )
}