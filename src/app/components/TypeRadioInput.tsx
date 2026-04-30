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
    <div className="flex flex-1 text-center text-[#FF6B6B] font-bold cursor-pointer rounded-2xl">
      <input
        type="radio"
        className="sr-only peer"
        id={uniqueId}
        name={name}
      />
      <label
        htmlFor={uniqueId}
        className="flex-1 px-6 py-2.5 rounded cursor-pointer border-2 border-[#FF6B6B]  peer-checked:text-white peer-checked:bg-[#FF6B6B] peer-checked:border-[#FF6B6B] peer-focus-visible:ring-2 peer-focus-visible:ring-black"
      >
        {label}
      </label>
    </div>
  )
}