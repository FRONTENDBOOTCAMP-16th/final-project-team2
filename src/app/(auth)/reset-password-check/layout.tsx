import { ReactNode } from "react"

interface ResetPasswordCheckProps {
  children: ReactNode
}

export default function ResetPasswordCheckLayout({ children }: ResetPasswordCheckProps) {
  return (
    <section className="h-full flex flex-col min-h-[calc(100vh-433px)] items-center justify-center p-14 bg-amber-100">
      {children}
    </section>
  )
}