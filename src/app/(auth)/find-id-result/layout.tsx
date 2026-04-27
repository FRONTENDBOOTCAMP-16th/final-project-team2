import { ReactNode } from "react"

interface FrindIdResultProps {
  children: ReactNode
}

export default function FindIdResultLayout({ children }: FrindIdResultProps) {
  return (
    <section className="h-full flex flex-col min-h-[calc(100vh-260px)] items-center justify-center p-14 bg-amber-100">
      {children}
    </section>
  )
}