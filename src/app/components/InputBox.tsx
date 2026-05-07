'use client'

import { useId, useState } from "react"

interface InputBoxProps {
  label: string
  placeholder?: string
  name: string
  error?: string
  type?: "text" | "password"
  value?: string
  defaultValue?: string
}

export default function InputBox({ label, placeholder, error, name, type = "text", value, defaultValue }: InputBoxProps) {
  const uniqueId = useId()
  const [localValue, setLocalValue] = useState(defaultValue || "")
  const [isFocused, setIsFocused] = useState(false)

  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])^/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // 정규식 및 규칙
  const isPasswordInput = type === "password" && name === "password"
  const isValidLength = localValue.length >= 8
  const validCheck = PASSWORD_REGEX.test(localValue)
  
  // 패스워드 입력시 표시
  const showValid = isPasswordInput && localValue.length > 0 && isFocused

  return (
    <div className="flex flex-col">
      <label htmlFor={uniqueId} className="text-[#474953] font-medium">{label}</label>
      <input
        className="px-3 py-2.5 mbs-1 rounded bg-[#F0F1F1]"
        id={uniqueId}
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p className="mbs-1 text-red-600" aria-live="polite" aria-hidden="true">{error}</p>

      {showValid && (
        <ul className="text-xs mbs-1 flex flex-col gap-1">
          <li className={isValidLength ? "text-green-600 font-bold" : "text-gray-500"}>
            {isValidLength ? "✓" : "•"} 8자 이상 입력해주세요
          </li>
          <li className={validCheck ? "text-green-600 font-bold" : "text-gray-500"}>
            {validCheck ? "✓" : "•"} 영문자, 숫자, 특수기호(!,@,#,$,%,^,&,*,?,_) 포함해주세요
          </li>
        </ul>
      )}
    </div>
  )
}