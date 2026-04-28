import type { Metadata } from "next";
import QueryProvider from '@/app/components/QueryProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Navi";
import Footer from "./components/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "행쇼",
  description: "세상의 문구류가 모두 모인 곳, 행복한쇼핑",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <QueryProvider>
          <main className="w-full h-full min-h-full flex-1">
            {children}
          </main>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
