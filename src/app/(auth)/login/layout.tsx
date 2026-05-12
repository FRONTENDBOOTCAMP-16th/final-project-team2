interface LayoutProps {
  children: React.ReactNode
}

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <section className="flex h-full min-h-[calc(100vh-433px)] flex-col items-center justify-center bg-[#FFF8F3] p-14">
      {children}
    </section>
  )
}
