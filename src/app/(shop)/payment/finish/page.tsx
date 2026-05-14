import { PackageCheck } from "lucide-react"
import Link from "next/link"

export default function ResultPage() {

  return (
    <div className="flex h-full items-center justify-center">
      <PackageCheck size={150} />
      <h2>주문이 완료되었습니다!</h2>
      <p>주문해 주셔서 감사합니다. 빠르게 배송 준비하겠습니다.</p>

      <div className="">
        <dl>
          <dt>주문번호</dt>
          <dd>INV-01234-123</dd>
        </dl>
        <dl>
          <dt>주문일시</dt>
          <dd>2026년 4월 27일 오전 09:17</dd>
        </dl>
      </div>

      <div className="">
        <Link href="/">홈으로</Link>
        <Link href="/">주문내역 보기</Link>
      </div>

    </div>
  )
}