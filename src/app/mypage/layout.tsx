import SideMenu from "./components/SideMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <section className="flex min-h-screen w-full bg-[#FFF8F3]">
      <SideMenu />
      <main className="flex-1 p-6 pt-32">
        <div className=" mx-auto w-full ">{children}</div>
      </main>
    </section>
  );
}
