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
      className="mt-6 inline-flex cursor-pointer rounded-full bg-primary px-8 py-3 font-bold text-white shadow-lg hover:bg-primary-dark transition-colors"
    >
      <LucideSearch className="me-2.5" />
      자세히 보기
    </Link>
  )
}
