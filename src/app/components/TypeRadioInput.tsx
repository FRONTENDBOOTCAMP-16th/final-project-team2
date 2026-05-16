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
    <div className="flex flex-1 cursor-pointer rounded-2xl text-center font-bold text-foreground">
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
        className="flex-1 cursor-pointer rounded-xl border-2 border-border px-6 py-2.5 transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary hover:border-primary-light"
      >
        {label}
      </label>
    </div>
  )
}
