import { ReactNode } from 'react'

interface SignupResultProps {
  children: ReactNode
}

export default function SignupResultLayout({ children }: SignupResultProps) {
  return <>{children}</>
}
