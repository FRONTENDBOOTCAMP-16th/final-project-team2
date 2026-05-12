'use client' // Context를 사용하기 위해 추가

import SideMenu from './components/SideMenu'
import SummaryMenu from './components/SummaryMenu'
import UserProfile from './components/UserProfile'
import MypageProviders from './providers/MypageProviders'
import { UserProvider } from './context/UserContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <UserProvider>
      <section className="min-h-screen w-full bg-[#FFF8F3]">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 pt-32">
          <aside className="shrink-0">
            <UserProfile />
            <SideMenu />
          </aside>
          <main className="flex-1">
            <div className="flex flex-col gap-6">
              <SummaryMenu />
              <MypageProviders>{children}</MypageProviders>
            </div>
          </main>
        </div>
      </section>
    </UserProvider>
  )
}
