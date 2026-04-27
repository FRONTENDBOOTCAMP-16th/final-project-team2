
import { ReactNode } from 'react'

interface recommendationProps {
  className?: string
  children: ReactNode
}

export default function ProductsRecommendationList({ className, children }: recommendationProps ) {
  return (
    <ul className={className}>
      {children}
    </ul>
  )
}