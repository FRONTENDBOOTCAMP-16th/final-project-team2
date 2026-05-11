'use client'

import { LucideCheck } from "lucide-react"
import { useId, useState } from "react"

interface CheckProps {
  label: string
  name: string
  error?: string
  defaultChecked?: boolean
}

export default function CheckBox({ label, name, error, defaultChecked }: CheckProps) {
  const uniqueId = useId()

  return (
    <>
      <div className="flex">
        <div className="relative items-center flex">
          <input
            className="peer border border-[#F0F1F1] bg-[#F0F1F1] rounded w-5 h-5 appearance-none cursor-pointer checked:bg-[#FF6B6B]"
            id={uniqueId}
            name={name}
            type="checkbox"
            defaultChecked={defaultChecked}
          />
          <LucideCheck className="hidden peer-checked:block text-white absolute w-3 h-3 top-1/2 left-1/2 -translate-1/2 pointer-events-none" strokeWidth={4}/>
        </div>
        <label
          htmlFor={uniqueId}
          className="cursor-pointer ms-1.5 text-[#474953] font-medium"
        >
          {label}
        </label>
      </div>
      <p className="mbs-1 text-red-600" aria-live="polite" aria-hidden="true">{error}</p>
    </>
  )
}