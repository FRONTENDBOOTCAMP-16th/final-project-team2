"use client"; // Context를 사용하기 위해 추가

import SideMenu from "./components/SideMenu";
import SummaryMenu from "./components/SummaryMenu";
import UserProfile from "./components/UserProfile";
<<<<<<< feat-102-Mypage-wishlist-product-sorting
import MypageProviders from "./providers/MypageProviders";
=======
import { UserProvider } from "./context/UserContext";
>>>>>>> dev

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
<<<<<<< feat-102-Mypage-wishlist-product-sorting
    <section className="w-full min-h-screen bg-[#FFF8F3]">
      <div className="flex max-w-6xl mx-auto pt-32 px-4 gap-6">
        <aside className="shrink-0">
          <UserProfile />
          <SideMenu />
        </aside>
        <main className="flex-1 mb-20">
          <div className="flex flex-col gap-6">
            <SummaryMenu />
            <MypageProviders>{children}</MypageProviders>
          </div>
        </main>
      </div>
    </section>
=======
    <UserProvider>
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
    </UserProvider>
>>>>>>> dev
  );
}
