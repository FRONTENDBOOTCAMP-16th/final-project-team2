import SideMenu from "./_components/SideMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: LayoutProps) {
  return (
    <section className="flex min-h-screen w-full max-w-7xl mx-auto">
      <SideMenu />
      <main className="flex-1 p-6 pt-32">
        <div className="max-w-4xl mx-auto w-full">{children}</div>
      </main>
    </section>
  );
}
