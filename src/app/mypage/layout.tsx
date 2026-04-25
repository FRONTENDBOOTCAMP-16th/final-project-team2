export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 ">
     
      <section className="flex-1 bg-[#FFF8F3]">
        {children}
      </section>
    </div>
  );
}