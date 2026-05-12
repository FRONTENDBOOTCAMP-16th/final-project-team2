import { ReactNode } from 'react'

interface FindIdLayoutProps {
  children: ReactNode
}

export default function FindIdLayout({ children }: FindIdLayoutProps) {
  return (
    <section className="flex h-full min-h-[calc(100vh-433px)] flex-col items-center justify-center bg-[#FFF8F3] p-14">
      {children}
    </section>
  )
}
