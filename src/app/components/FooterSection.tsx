import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 px-4 pbs-14 pbe-8">
      <div className="max-w-7xl mx-auto">
        <strong className="font-extrabold">행쇼마켓</strong>

        <div className="mbs-4">
          <strong className="text-2xl font-extrabold">1544-1234</strong>
          <p className="mbs-2">평일 : 00:00 - 00:00</p>
          <p>주말 및 공휴일 휴무</p>
        </div>

        <div className="flex gap-4 mbs-6">
          <Link href='/inquire'>1:1문의하기</Link>
          <Link href='/notice'>공지사항</Link>
          <button type="button">이미지 저작권 및 AI 사용</button>
        </div>

        <small className="block text-base font-extrabold mbs-10 text-[#2D3142] opacity-80">copyright by 2026</small>
      </div>
    </footer>
  )
}