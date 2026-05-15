import { ReactNode } from 'react'

interface FindIdLayoutProps {
  children: ReactNode
}

export default function FindIdLayout({ children }: FindIdLayoutProps) {
  return (
    <section className="flex h-full min-h-[calc(100vh-433px)] flex-col items-center justify-center bg-[#f5f5f5] p-14 dark:bg-[#868686]">
      {children}
    </section>
  )
}
