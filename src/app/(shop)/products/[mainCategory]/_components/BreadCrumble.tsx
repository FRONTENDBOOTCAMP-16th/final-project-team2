import { ChevronRight, HomeIcon } from 'lucide-react'
import Link from 'next/link'

type categoryProps = {
  category: string
}

const BreadCrumble = ({ category }: categoryProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link aria-label="홈으로 이동하기" href="/" className="hover:text-primary transition-colors">
            <HomeIcon className="w-5 h-5" />
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li className="text-lg font-medium text-foreground">{category}</li>
      </ol>
    </nav>
  )
}

export default BreadCrumble
