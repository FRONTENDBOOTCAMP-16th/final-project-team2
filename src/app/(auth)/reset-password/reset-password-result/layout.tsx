import { ReactNode } from "react"

interface ResetPasswordProps {
  children: ReactNode
}

export default function ResetPasswordLayout({ children }: ResetPasswordProps) {
  return (
    <>
      {children}
    </>
  )
}