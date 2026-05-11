import { LucideSearch } from "lucide-react";
import Link from "next/link";

interface MoreDetailProps {
  category_path: string
  id: string
}

export default function MainMoreDetail({ category_path, id }: MoreDetailProps ) {
  return (
    <Link
      href={`/products/${category_path}/${id}`}
      className="inline-flex mt-9 px-8 py-3 text-white font-bold bg-[#FF6B6B] cursor-pointer rounded-2xl"
    >
      <LucideSearch className="me-2.5" />
      자세히 보기
    </Link>
  )
}