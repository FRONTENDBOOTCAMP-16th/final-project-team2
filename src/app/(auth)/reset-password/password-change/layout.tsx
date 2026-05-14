import { ReactNode } from 'react'

interface ChangePasswordProps {
  children: ReactNode
}

export default function ChangePasswordLayout({ children }: ChangePasswordProps) {
  return (
    <section className="flex h-full min-h-[calc(100vh-433px)] flex-col items-center justify-center bg-[#f5f5f5] p-14 dark:bg-[#868686]">
      {children}
    </section>
  )
}
