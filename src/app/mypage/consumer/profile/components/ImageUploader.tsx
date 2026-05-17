'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface ImageUploaderProps {
  label: string
  defaultImage?: string
  onUploadSuccess?: (url: string) => void
  isEditing: boolean
}

export default function ImageUploader({
  label,
  defaultImage = '',
  onUploadSuccess,
  isEditing,
}: ImageUploaderProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 로컬에서 선택한 파일의 임시 미리보기 URL을 담는 상태입니다.
  const [localPreview, setLocalPreview] = useState<string | null>(null)

  const handleButtonClick = (e: React.MouseEvent) => {
    // 수정 모드가 아닐 때는 클릭이 동작하지 않도록 방어합니다.
    if (!isEditing) {
      e.preventDefault()
      return
    }
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일을 선택하자마자 브라우저 메모리에 임시 URL을 만들어 화면에 바로 보여줍니다.
    const objectUrl = URL.createObjectURL(file)
    setLocalPreview(objectUrl)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `profile/${fileName}`

      // Supabase Storage에 업로드 시도
      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 업로드된 파일의 공용 URL을 가져옵니다.
      const {
        data: { publicUrl },
      } = supabase.storage.from('public-assets').getPublicUrl(filePath)

      // 부모 컴포넌트(Info.tsx)의 setFormData를 실행하기 위해 콜백 함수를 호출합니다.
      if (onUploadSuccess) {
        onUploadSuccess(publicUrl)
      }
    } catch (error) {
      console.error('업로드 에러:', error)
      alert('업로드 실패')
      setLocalPreview(null) // 에러 발생 시 미리보기를 초기화합니다.
    }
  }

  // 화면에 표시할 이미지를 결정합니다.
  // 새로 선택한 사진(localPreview)이 있으면 그것을 보여주고, 없으면 기존 DB 이미지(defaultImage)를 보여줍니다.
  const displayImage = localPreview || defaultImage
  const isImageValid =
    displayImage && displayImage !== '' && displayImage !== '/'

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="ml-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <div className="relative flex aspect-square w-24 items-center justify-center overflow-hidden border border-gray-100 bg-gray-50">
          {isImageValid ? (
            <Image
              src={displayImage}
              alt="미리보기"
              fill
              className="object-cover"
              unoptimized // 외부 URL 이미지 로딩 시 최적화 문제를 방지하기 위해 추가할 수 있습니다.
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="mb-1 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
          aria-disabled={!isEditing}
          className={`rounded-sm border border-gray-300 px-4 py-2 text-xs font-semibold transition ${
            !isEditing ? 'hidden' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
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
