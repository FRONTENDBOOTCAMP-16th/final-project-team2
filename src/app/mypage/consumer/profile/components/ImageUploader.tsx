"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  label: string;
  defaultImage?: string;
}

export default function ImageUploader({
  label,
  defaultImage = "/",
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

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-sm font-semibold text-gray-700 ml-1">{label}</span>

      <div className="flex items-center gap-4">
        <div className="relative w-24 aspect-square overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
          <Image
            src={preview}
            alt="프로필 미리보기"
            fill
            className="object-cover"
          />
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
