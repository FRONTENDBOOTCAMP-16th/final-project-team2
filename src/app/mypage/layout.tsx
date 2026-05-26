import { createClient } from '@/utils/supabase/server'
import { UserProvider } from './context/UserContext'
import SummaryMenu from './components/SummaryMenu'
import UserProfile from './components/UserProfile'
import SideMenu from './components/SideMenu'
import { Toaster } from 'sonner'

interface LayoutProps {
  children: React.ReactNode
}

export default async function MyPageLayout({ children }: LayoutProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from('users')
        .select('id,email,name,role,grade,profile_image')
        .eq('id', user.id)
        .single()
    : { data: null }

  // BUSINESS 유저일 경우 store 정보도 함께 조회
  let storeData = null
  if (profile?.role === 'BUSINESS') {
    const { data } = await supabase
      .from('stores')
      .select('id, profile_image')
      .eq('owner_id', profile.id)
      .single()
    storeData = data
  }

  const initialUser = profile
    ? {
        ...profile,
        store_image: storeData?.profile_image ?? undefined,
        store_id: storeData?.id ?? undefined,
      }
    : null

  return (
    <UserProvider initialUser={initialUser}>
      <h1 className="sr-only">마이페이지</h1>
      <div className="min-h-screen w-full bg-[#FFF8F3] dark:bg-[#25292D] dark:text-black">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 pt-32">
          <aside className="shrink-0">
            <UserProfile />
            <SideMenu />
          </aside>
          <Toaster />
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <SummaryMenu />
              {children}
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  )
}
