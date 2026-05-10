import { ReactNode } from "react"

interface ResetPasswordProps {
  children: ReactNode
}

export default function ResetPasswordLayout({ children }: ResetPasswordProps) {
  return (
    <section className="h-full flex flex-col min-h-[calc(100vh-433px)] items-center justify-center p-14 bg-[#FFF8F3]">
      {children}
    </section>
  )
}