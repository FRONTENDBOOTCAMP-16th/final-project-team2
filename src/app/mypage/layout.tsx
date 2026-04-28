import SideMenu from "./components/SideMenu";
import SummaryMenu from "./components/SummaryMenu";
import UserProfile from "./components/UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <section className="w-full min-h-screen bg-[#FFF8F3]">
      <div className="flex max-w-6xl mx-auto pt-32 px-4 gap-6">
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
  );
}
