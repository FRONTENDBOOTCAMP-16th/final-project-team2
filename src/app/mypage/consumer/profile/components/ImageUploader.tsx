'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface ImageUploaderProps {
  label: string
  defaultImage?: string
}

export default function ImageUploader({
  label,
  defaultImage = '',
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string>(defaultImage)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isImageValid = preview && preview !== '' && preview !== '/'

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="ml-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
        {label}
      </span>

      <div className="flex items-center gap-4">
        <div className="relative flex aspect-square w-24 items-center justify-center overflow-hidden border border-gray-100 bg-gray-50">
          {isImageValid ? (
            <Image src={preview} alt="미리보기" fill className="object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="mb-1 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[10px]">No Image</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          이미지 변경
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  )
}
