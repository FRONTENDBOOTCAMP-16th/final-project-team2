'use client'

import { useId, useState } from 'react'
import { ZodType } from 'zod'

interface InputBoxProps {
  label: string
  placeholder?: string
  name: string
  error?: string
  type?: 'text' | 'password'
  schema?: ZodType,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

export default function InputBox({
  label,
  placeholder,
  error,
  name,
  type = 'text',
  schema,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
}: InputBoxProps) {
  const uniqueId = useId()
  const [localValue, setLocalValue] = useState(defaultValue || '')
  const [isFocused, setIsFocused] = useState(false)
  const [localError, setLocalError] = useState('')

  const PASSWORD_REGEX = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/
  // onChange, Focus, Blur 이벤트 - 기본값외에 받아오는 값있으면 적용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)

    // 타이핑시 에러 삭제
    if (localError) setLocalError('')

    // 외부에서 onChange값을 받으면 해당 onChange 실행
    if (onChange) onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)

    // 외부에서 onFocus값을 받으면 해당 onFocus 실행
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)

    if (schema) {
      const result = schema.safeParse(e.target.value)
      
      if (!result.success) {
        setLocalError(result.error.issues[0].message)
      } else {
        setLocalError('')
      }
    }

    // 외부에서 onBlur값을 받으면 해당 onBlur 실행
    if (onBlur) onBlur(e)
  }

  // 표시할 에러 - 부모가 내려준에러 우선표시, 없으면 스스로 검증한 에러
  const displayError = error || localError

  // 정규식 및 규칙
  const isPasswordInput = type === 'password' && name === 'password'
  const isValidLength = localValue.length >= 8
  const validCheck = PASSWORD_REGEX.test(localValue)

  // 패스워드 입력시 표시
  const showValid = isPasswordInput && localValue.length > 0 && isFocused

  return (
    <div className="flex flex-col">
      <label htmlFor={uniqueId} className="font-medium text-[#474953]">
        {label}
      </label>
      <input
        className="mbs-1 rounded bg-[#F0F1F1] px-3 py-2.5 dark:bg-[#b1b1b1] dark:placeholder:text-black"
        id={uniqueId}
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p className="mbs-1 text-red-600" aria-live="polite" aria-hidden="true">
        {displayError}
      </p>

      {showValid && (
        <ul className="mbs-1 flex flex-col gap-1 text-xs">
          <li
            className={
              isValidLength ? 'font-bold text-green-600' : 'text-gray-500'
            }
          >
            {isValidLength ? '✓' : '•'} 8자 이상 입력해주세요
          </li>
          <li
            className={
              validCheck ? 'font-bold text-green-600' : 'text-gray-500'
            }
          >
            {validCheck ? '✓' : '•'} 영문자, 숫자, 특수기호(!,@,#,$,%,^,&,*,?,_)
            포함해주세요
          </li>
        </ul>
      )}
    </div>
  )
}
