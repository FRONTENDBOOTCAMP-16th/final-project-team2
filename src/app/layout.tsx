import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Header from './components/Navi'
import Footer from './components/FooterSection'
import localFont from 'next/font/local'
import { ThemeProvider } from './components/provider/theme-provider'

const suit = localFont({
  src: '../fonts/suit/SUIT-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suit',
})

export const metadata: Metadata = {
  title: '행쇼',
  description: '세상의 문구류가 모두 모인 곳, 행복한쇼핑',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${suit.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <main id="main-content" className="h-full min-h-full w-full flex-1">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
