import { useId } from "react"

interface TypeRadioInput {
  label: string
  name: string
  value: string
  checked?: boolean
  onChange?: () => void
}

export default function TypeRadioInput({ label, name }: TypeRadioInput) {
  const uniqueId = useId()

  return (
    <div className="border flex-1 cursor-pointer">
      <input
        type="radio"
        className="sr-only peer"
        id={uniqueId}
        name={name}
      />
      <label
        htmlFor={uniqueId}
        className="cursor-pointer block  text-center peer-checked:bg-amber-300 peer-checked:border-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-black py-2"
      >
        {label}
      </label>
    </div>
  )
}