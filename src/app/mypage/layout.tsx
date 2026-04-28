import SideMenu from "./components/SideMenu";
import SummaryMenu from "./components/SummaryMenu";
import UserProfile from "./components/UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <section className="w-full min-h-screen bg-[#FFF8F3]">
      <div className="flex max-w-7xl mx-auto pt-32 px-4 md:px-6">
        {/* 왼쪽 사이드 영역 */}
        <aside className="shrink-0">
          <UserProfile />
          <SideMenu />
        </aside>

        {/* 오른쪽 메인 콘텐츠 영역 */}
        <main className="flex-1 p-4">
          <div className="mx-auto w-full">
            <SummaryMenu />
            {children}
          </div>
        </main>
      </div>
    </section>
  );
}
