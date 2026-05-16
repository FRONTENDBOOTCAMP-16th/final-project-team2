'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function DarkModeBtn() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-card hover:bg-muted transition-colors text-foreground"
      aria-label="다크모드 변경"
      title="테스트용 버튼입니다 지울 예정입니다"
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-warning" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-accent" />
    </button>
  )
}
