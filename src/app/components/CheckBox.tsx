import { useId } from "react"

interface CheckProps {
  label: string
  name: string
}

export default function CheckBox({ label, name }: CheckProps) {
  const uniqueId = useId()

  return (
     <div className="flex items-center">
      <input
        className="border w-5 h-5 appearance-none cursor-pointer checked:bg-black"
        id={uniqueId}
        name={name}
        type="checkbox"
      />
      <label
        htmlFor={uniqueId}
        className="cursor-pointer ms-2 text-gray-600"
      >
        {label}
      </label>
    </div>
  )
}