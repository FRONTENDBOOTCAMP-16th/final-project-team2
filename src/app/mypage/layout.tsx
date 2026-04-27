import SideMenu from "./components/SideMenu";
import SummaryMenu from "./components/SummaryMenu";
import UserProfile from "./components/UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <section className="flex min-h-screen w-full max-w-7xl mx-auto pt-32">
      <div>
        <UserProfile />
        <SideMenu />
      </div>
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto w-full">
          <SummaryMenu />
          {children}
        </div>
      </main>
    </section>
  );
}
