import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Header from './components/Navi'
import Footer from './components/FooterSection'
import localFont from 'next/font/local'
import QueryProviders from './mypage/providers/QueryProviders'
import { ThemeProvider } from './components/provider/theme-provider'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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

/**
 * 모바일 기기의 실제 화면 너비를 기준으로 렌더링하도록 설정
 *
 * 이 설정이 없으면 모바일 브라우저가
 * 페이지를 데스크탑 폭(약 980px)으로 인식하여 축소 렌더링함
 *
 * 그 결과 Tailwind 반응형 클래스가 모바일에서도
 * 데스크탑 기준으로 동작할 수 있음
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        'h-full',
        'antialiased',
        suit.className,
        'font-sans',
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="bottom-center" />
          <QueryProviders>
            <Suspense
              fallback={
                <div className="h-26.25 w-full bg-white dark:bg-[#1b1b1b]" />
              }
            >
              <Header />
            </Suspense>

            <main id="main-content" className="h-full min-h-full w-full flex-1">
              <Suspense fallback={null}>{children}</Suspense>
            </main>

            <Footer />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
