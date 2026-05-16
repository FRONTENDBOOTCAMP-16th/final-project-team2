interface PriceBoxProps {
  totalOriginPrice: number;
  totalDiscountedPrice: number;
}

export default function PriceBox({ totalOriginPrice, totalDiscountedPrice }: PriceBoxProps) {

  const totalDiscountAmount = totalOriginPrice - totalDiscountedPrice;

  return (

    <section aria-labelledby="summary-heading" className="bg-card p-6 rounded-2xl border border-border shadow-sm">

      <h2 id="summary-heading" className="font-bold mb-6 text-2xl text-foreground">결제 금액 요약</h2>

      <dl className="space-y-3">
        {/* 상품 금액 */}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">상품금액</dt>
          <dd className="font-medium text-foreground">{totalOriginPrice.toLocaleString()}원</dd>
        </div>

        {/* 할인 금액 */}
        <div className="flex justify-between text-primary">
          <dt>할인금액</dt>
          <dd>
            <span aria-hidden="true">-</span>
            {totalDiscountAmount.toLocaleString()}원
            <span className="sr-only">차감됨</span>
          </dd>
        </div>

        {/* 구분선 */}
        <div className="border-t border-border my-4" role="presentation" />

        {/* 최종 결제 금액 */}
        <div className="flex justify-between items-center text-xl font-bold">
          <dt className="text-foreground">총 결제금액</dt>
          <dd className="text-primary-dark">
            <span className="sr-only">최종 결제 예정 금액은</span>
            {totalDiscountedPrice.toLocaleString()}원
          </dd>
        </div>
      </dl>
    </section>
  )
}
