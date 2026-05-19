import { ReactNode } from 'react'

type ProductsCardListProps = {
  children: ReactNode
  className?: string
}

export default function ProductsCardList({
  children,
  className = '',
}: ProductsCardListProps) {
  return (
    <ul
      className={`grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [&_a>div]:w-full! ${className}`}
    >
      {children}
    </ul>
  )
}
