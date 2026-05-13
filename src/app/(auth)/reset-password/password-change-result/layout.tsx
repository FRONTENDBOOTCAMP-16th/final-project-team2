import { ReactNode } from 'react'

interface ResetPasswordProps {
  children: ReactNode
}

export default function ResetPasswordLayout({ children }: ResetPasswordProps) {
  return (
    <section className="flex h-full min-h-[calc(100vh-433px)] flex-col items-center justify-center bg-[#FFF8F3] p-14">
      {children}
    </section>
  )
}
