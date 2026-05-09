import { ReactNode } from "react"

interface FrindIdResultProps {
  children: ReactNode
}

export default function FindIdResultLayout({ children }: FrindIdResultProps) {
  return (
    <>
      {children}
    </>
  )
}