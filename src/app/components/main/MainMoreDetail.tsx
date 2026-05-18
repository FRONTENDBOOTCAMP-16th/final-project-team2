import { LucideSearch } from 'lucide-react'
import Link from 'next/link'

interface MoreDetailProps {
  category_path: string
  id: string
}

export default function MainMoreDetail({ category_path, id }: MoreDetailProps) {
  return (
    <Link
      href={`/products/${category_path}/${id}`}
      aria-label="상품 정보 자세히 보기"
      className="mt-9 inline-flex cursor-pointer rounded-2xl bg-black px-8 py-3 font-bold text-white"
    >
      <LucideSearch className="me-2.5" />
      자세히 보기
    </Link>
  )
}
