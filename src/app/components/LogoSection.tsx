'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LogoSection() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const LogoTag = isHome ? 'h1' : 'div'

  return (
    <LogoTag>
      <Link
        href="/"
        className="text-lg font-bold whitespace-nowrap md:text-2xl"
      >
        행쇼마켓
      </Link>
    </LogoTag>
  )
}
