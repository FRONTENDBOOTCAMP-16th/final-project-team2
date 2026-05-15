'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  href: string
  icon: LucideIcon
}

export default function StatCard({
  label,
  value,
  href,
  icon: Icon,
}: StatCardProps) {
  // 상점 이름(string)이 6자보다 길면 폰트 크기를 줄입니다.
  const isLongText = typeof value === 'string' && value.length > 6

  return (
    <Link
      href={href}
      className="flex h-47.5 flex-1 cursor-pointer flex-col items-center justify-center gap-6 border-4 border-gray-300 bg-white transition-colors hover:bg-[#FF6B6B]/5 dark:hover:bg-lime-50"
    >
      <span
        className={`px-2 text-center leading-tight font-black ${
          isLongText ? 'text-2xl' : 'text-5xl'
        }`}
      >
        {value}
      </span>
      <span className="flex items-center gap-1 text-base font-black text-gray-700">
        {Icon && <Icon size={18} strokeWidth={2.5} />}
        {label}
      </span>
    </Link>
  )
}
