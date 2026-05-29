'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LogoSection() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const LogoTag = isHome ? 'h1' : 'div'

  return (
    <LogoTag>
      <Link href="/" className="text-2xl font-bold">
        행쇼마켓
      </Link>
    </LogoTag>
  )
}
