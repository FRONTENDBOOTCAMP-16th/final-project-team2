'use client'

import { LucideCheck } from 'lucide-react'
import { useId, useState } from 'react'

interface CheckProps {
  label: string
  name: string
  error?: string
  defaultChecked?: boolean
}

export default function CheckBox({
  label,
  name,
  error,
  defaultChecked,
}: CheckProps) {
  const uniqueId = useId()

  return (
    <>
      <div className="flex">
        <div className="relative flex items-center">
          <input
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#F0F1F1] bg-[#F0F1F1] checked:bg-black"
            id={uniqueId}
            name={name}
            type="checkbox"
            defaultChecked={defaultChecked}
          />
          <LucideCheck
            className="pointer-events-none absolute top-1/2 left-1/2 hidden h-3 w-3 -translate-1/2 text-white peer-checked:block"
            strokeWidth={4}
          />
        </div>
        <label
          htmlFor={uniqueId}
          className="ms-1.5 cursor-pointer font-medium text-[#474953]"
        >
          {label}
        </label>
      </div>
      <p className="mbs-1 text-red-600" aria-live="polite">
        {error}
      </p>
    </>
  )
}
