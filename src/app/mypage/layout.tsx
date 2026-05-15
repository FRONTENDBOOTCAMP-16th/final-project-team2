'use client'

import SideMenu from './components/SideMenu'
import SummaryMenu from './components/SummaryMenu'
import UserProfile from './components/UserProfile'
import { UserProvider, useUser } from './context/UserContext'

interface LayoutProps {
  children: React.ReactNode
}

// 실제 내용을 그리는 내부 컴포넌트를 분리했습니다.
// 이 안에서 role을 꺼내야 SummaryMenu에 key를 줄 수 있습니다.
function LayoutContent({ children }: LayoutProps) {
  const { role } = useUser()

  return (
    <section className="min-h-screen w-full bg-[#FFF8F3] dark:bg-[#25292D] dark:text-black">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 pt-32">
        <aside className="shrink-0">
          <UserProfile />
          <SideMenu />
        </aside>
        <main className="flex-1">
          <div className="flex flex-col gap-6">
            {/* key를 제공함으로서 요약 메뉴가 변경되었음을 전달해 새로고침과 같이 새로 렌더링을 진행함  */}
            <SummaryMenu key={role} />
          {children}
          </div>
        </main>
      </div>
    </section>
  )
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <UserProvider>
      <LayoutContent>{children}</LayoutContent>
    </UserProvider>
  )
}
