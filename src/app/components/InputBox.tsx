import { useId } from "react"

interface InputBoxProps {
  label: string
  placeholder?: string
  name: string
  type?: "text" | "password"
  value?: string
  onChange?: () => void
}

export default function InputBox({ label, placeholder, name, type = "text", value, onChange }: InputBoxProps) {
  const uniqueId = useId()

  return (
    <div className="flex flex-col">
      <label htmlFor={uniqueId} className="text-[#474953] font-medium">{label}</label>
      <input
        className="px-3 py-2.5 mbs-1 rounded bg-[#F0F1F1]"
        id={uniqueId}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  )
}