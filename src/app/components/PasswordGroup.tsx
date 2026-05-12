'use client'

import { useState } from 'react'
import InputBox from './InputBox'

interface PasswordGroupProps {
  passwordError?: string
  confirmError?: string
  defaultPassword?: string
  defaultConfirm?: string
}

export default function PasswordGroup({
  passwordError,
  confirmError,
  defaultPassword,
  defaultConfirm,
}: PasswordGroupProps) {
  // 비밀번호, 비밀번호재확인, 포커스 여부
  const [password, setPassword] = useState(defaultPassword || '')
  const [confirmPassword, setConfirmPassword] = useState(defaultPassword || '')
  const [isConfirmFocus, setIsConfirmFocus] = useState(false)

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
        error={passwordError}
        defaultValue={defaultPassword}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setIsConfirmFocus(true)}
        onBlur={() => setIsConfirmFocus(false)}
      />
      <InputBox
        type="password"
        label="비밀번호 재입력"
        name="confirmPassword"
        placeholder="비밀번호를 재입력하세요"
        error={confirmError}
        defaultValue={defaultConfirm}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onFocus={() => setIsConfirmFocus(true)}
        onBlur={() => setIsConfirmFocus(false)}
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
