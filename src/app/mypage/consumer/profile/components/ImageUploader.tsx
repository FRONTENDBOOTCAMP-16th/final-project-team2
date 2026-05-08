"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  label: string;
  defaultImage?: string;
}

export default function ImageUploader({
  label,
  defaultImage = "", // 기본값을 빈 문자열로 설정하여 에러 방지
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(defaultImage);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 경로가 유효한지 체크 (빈 문자열이거나 "/"인 경우 제외)
  const isImageValid = preview && preview !== "" && preview !== "/";

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-sm font-semibold text-gray-700 ml-1">{label}</span>

      <div className="flex items-center gap-4">
        <div className="relative w-24 aspect-square overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
          {/* 이미지가 유효할 때만 Image 컴포넌트 출력 */}
          {isImageValid ? (
            <Image
              src={preview}
              alt="프로필 미리보기"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8 mb-1"
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
              <span className="text-xs">No Image</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition"
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
  );
}
