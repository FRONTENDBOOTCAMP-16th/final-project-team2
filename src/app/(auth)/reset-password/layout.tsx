import { ReactNode } from "react"

interface ResetPasswordProps {
  children: ReactNode
}

export default function ResetPasswordLayout({ children }: ResetPasswordProps) {
  return (
    <section className="h-full flex flex-col min-h-[calc(100vh-260px)] items-center justify-center p-14 bg-amber-100">
      {children}
    </section>
  )
}