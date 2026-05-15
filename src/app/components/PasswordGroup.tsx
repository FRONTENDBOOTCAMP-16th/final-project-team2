'use client'

import { useState } from 'react'
import InputBox from './InputBox'
import { passwordSchema, passwordConfirmSchema } from '@/app/lib/auth'

export default function PasswordGroup() {
  // 비밀번호, 비밀번호재확인, 포커스 여부
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmFocus, setIsConfirmFocus] = useState(false)
  const [matchError, setMatchError] = useState('')

  // 재입력 input이 blur 될 때 일치 여부 검사
  const handleConfirmBlur = () => {
    setIsConfirmFocus(false)
    if (confirmPassword && password !== confirmPassword) {
      setMatchError('비밀번호가 일치하지 않습니다.')
    } else {
      setMatchError('')
    }
  }

  // 비밀번호 매칭 메세지 표시 조건
  const isTyping = confirmPassword.length > 0
  const isMatched = password === confirmPassword
  const showMessage = isTyping && isConfirmFocus

  return (
    <>
      <InputBox
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력하세요"
        schema={passwordSchema}
        onChange={(e) => {
          setPassword(e.target.value)
          if (matchError) setMatchError('')
        }}
      />
      <InputBox
        type="password"
        label="비밀번호 재입력"
        name="confirmPassword"
        placeholder="비밀번호를 재입력하세요"
        schema={passwordConfirmSchema}
        error={matchError}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onFocus={() => setIsConfirmFocus(true)}
        onBlur={handleConfirmBlur}
      />
      {showMessage && (
        <p
          className={`text-xs font-bold ${isMatched ? 'text-green-600' : 'text-gray-500'}`}
        >
          {isMatched
            ? '✓ 비밀번호가 일치합니다'
            : '• 비밀번호가 일치하지 않습니다'}
        </p>
      )}
    </>
  )
}
