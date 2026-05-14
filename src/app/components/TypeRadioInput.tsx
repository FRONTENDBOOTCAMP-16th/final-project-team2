import { useId } from 'react'

interface TypeRadioInput {
  label: string
  name: string
  value: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: () => void
}

export default function TypeRadioInput({
  label,
  name,
  value,
  defaultChecked,
}: TypeRadioInput) {
  const uniqueId = useId()

  return (
    <div className="flex flex-1 cursor-pointer rounded-2xl text-center font-bold text-[#FF6B6B]">
      <input
        type="radio"
        className="peer sr-only"
        id={uniqueId}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={uniqueId}
        className="flex-1 cursor-pointer rounded border-2 border-[#FF6B6B] px-6 py-2.5 peer-checked:border-[#FF6B6B] peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black"
      >
        {label}
      </label>
    </div>
  )
}
