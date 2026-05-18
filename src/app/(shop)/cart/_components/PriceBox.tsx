interface PriceBoxProps {
  totalOriginPrice: number;
  totalDiscountedPrice: number;
}

export default function PriceBox({ totalOriginPrice, totalDiscountedPrice }: PriceBoxProps) {

  const totalDiscountAmount = totalOriginPrice - totalDiscountedPrice;

  return (

    <section aria-labelledby="summary-heading">

      <h2 id="summary-heading" className="font-bold mb-6 text-2xl">결제 금액 요약</h2>

      <dl className="space-y-3">
        {/* 상품 금액 */}
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-300">상품금액</dt>
          <dd className="font-medium">{totalOriginPrice.toLocaleString()}원</dd>
        </div>

        {/* 할인 금액 */}
        <div className="flex justify-between text-red-500">
          <dt>할인금액</dt>
          <dd>
            <span aria-hidden="true">-</span>
            {totalDiscountAmount.toLocaleString()}원
            <span className="sr-only">차감됨</span>
          </dd>
        </div>

        {/* 최종 결제 금액 */}
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-xl font-bold">
          <dt>총 결제금액</dt>
          <dd className="text-black-600">
            <span className="sr-only">최종 결제 예정 금액은</span>
            {totalDiscountedPrice.toLocaleString()}원
          </dd>
        </div>
      </dl>
    </section>
  )
}