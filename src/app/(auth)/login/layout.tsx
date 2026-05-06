interface LayoutProps {
  children: React.ReactNode
}

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <section className="h-full flex flex-col min-h-[calc(100vh-433px)] items-center justify-center p-14 bg-amber-100">
      {children}
    </section>
  )
}