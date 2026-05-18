import { ChevronRight, HomeIcon } from 'lucide-react'
import Link from 'next/link'

type categoryProps = {
  category: string
}

const BreadCrumble = ({ category }: categoryProps) => {
  return (
    <nav aria-labelledby="breadcrumb">
      <h1 id="breadcrumb" className="sr-only">
        현재 메뉴 위치
      </h1>
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link
            aria-label="홈으로 이동하기"
            href="/"
            className="p-2 hover:text-black dark:text-white dark:hover:text-red-500"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li className="text-lg font-medium text-black dark:text-white">
          {category}
        </li>
      </ol>
    </nav>
  )
}

export default BreadCrumble
