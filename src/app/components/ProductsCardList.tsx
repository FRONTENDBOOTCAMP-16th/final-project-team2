import { ReactNode } from 'react'

type ProductsCardListProps = {
  children: ReactNode
  className?: string
}

export default function ProductsCardList({
  children,
  className = '',
}: ProductsCardListProps) {
  return <ul className={`grid grid-cols-4 gap-6 ${className}`}>{children}</ul>
}
