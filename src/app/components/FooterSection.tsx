import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-muted px-4 pbs-14 pbe-8 dark:bg-muted">
      <div className="mx-auto max-w-7xl">
        <strong className="font-extrabold text-primary-dark text-xl">행쇼마켓</strong>

        <div className="mbs-4">
          <strong className="text-2xl font-extrabold text-foreground">1544-1234</strong>
          <p className="mbs-2 text-muted-foreground">평일 : 00:00 - 00:00</p>
          <p className="text-muted-foreground">주말 및 공휴일 휴무</p>
        </div>

        <div className="mbs-6 flex gap-4">
          <Link href="/inquire" className="text-foreground hover:text-primary transition-colors font-medium">1:1문의하기</Link>
          <Link href="/notice" className="text-foreground hover:text-primary transition-colors font-medium">공지사항</Link>
          <button type="button" className="text-foreground hover:text-primary transition-colors font-medium">이미지 저작권 및 AI 사용</button>
        </div>

        <small className="mbs-10 block text-base font-extrabold text-muted-foreground">
          copyright by 2026
        </small>
      </div>
    </footer>
  )
}
