import { ProfileFormProps } from '@/app/mypage/types/profile'
import { useId } from 'react'

export default function ProfileForm({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  type,
  readOnly = false,
  error,
}: ProfileFormProps) {
  const id = useId()
  const isNotEditable = disabled || readOnly

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="ml-1 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`h-12 max-w-2xl border pl-4 ${error ? 'border-red-500' : 'border-gray-300'} ${
          isNotEditable
            ? 'cursor-not-allowed bg-gray-50 text-gray-400'
            : 'bg-white text-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
        } `}
      />
      {error && <p className="ml-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
