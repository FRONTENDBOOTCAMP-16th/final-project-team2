import { createClient } from '@/utils/supabase/server'
import { UserProvider } from './context/UserContext'
import SummaryMenu from './components/SummaryMenu'
import UserProfile from './components/UserProfile'
import SideMenu from './components/SideMenu'

interface LayoutProps {
  children: React.ReactNode
}

// (비동기) 서버 컴포넌트
export default async function MyPageLayout({ children }: LayoutProps) {
  
  // 서버용 Supabase 클라이언트 생성
  const supabase = await createClient()
  
  // 인증된 사용자(user) 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser()

  // public.users 테이블에서 role 포함된 프로필 정보 가져오기
  const { data: profile } = user ? await supabase.from('users').select('id,email,name,role,grade,profile_image').eq('id', user.id).single() : { data: null }

  return (
    // 서버에서 조회한 사용자 정보를 initialUser로 전달
    <UserProvider initialUser={profile}>
      <section className="min-h-screen w-full bg-[#FFF8F3] dark:bg-[#25292D] dark:text-black">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 pt-32">
        <aside className="shrink-0">
          <UserProfile />
          <SideMenu />
        </aside>
        <main className="flex-1">
          <div className="flex flex-col gap-6">
            <SummaryMenu />
          {children}
          </div>
        </main>
      </div>
    </section>
    </UserProvider>
  )
}
