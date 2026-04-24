import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 px-8 pbs-14 pbe-8">
      <strong>행쇼마켓</strong>

      <div className="">
        <div className="">
          <strong>1544-1234</strong>
          <p>평일 : 00:00 - 00:00</p>
          <p>주말 및 공휴일 휴무</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href='/inquire'>1:1문의하기</Link>
        <button type="button">이미지 저작권 및 AI 사용</button>
        <small className="ms-auto">copyright by 2026</small>
      </div>
    </footer>
  )
}