import { ReactNode, Suspense } from "react"

interface FrindIdResultProps {
  children: ReactNode
}

export default function FindIdResultLayout({ children }: FrindIdResultProps) {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}