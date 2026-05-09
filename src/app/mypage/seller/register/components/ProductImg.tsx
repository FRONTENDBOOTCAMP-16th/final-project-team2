"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  error?: string;
};

export default function ProductImg({ error }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-5">
      <p id="productImageLabel" className="text-xl">
        상품 이미지 업로드
      </p>

      <div className="flex flex-row gap-4 items-center">
        <input
          type="file"
          id="productImage"
          name="productImage"
          aria-describedby="productImageLabel"
          accept="image/png, image/jpeg"
          className="sr-only"
          onChange={handleChangeImg}
        />
        {/* 이미지 미리보기 (사용자 피드백) */}
        {preview && (
          <Image
            src={preview}
            alt="상품 이미지 미리보기"
            width={300}
            height={300}
            className="border-2 border-red-400 p-3 "
          />
        )}

        <label
          htmlFor="productImage"
          tabIndex={0}
          className={`cursor-pointer border p-4 h-10 flex items-center font-bold 
            hover:bg-gray-400  hover:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${preview ? "bg-[#FF6B6B] text-white p-5" : "bg-white text-gray-600 "}`}
        >
          {preview ? "이미지 선택 완료" : "이미지 선택"}
        </label>

        <span aria-live="polite" className="text-sm text-gray-500 shrink-0">
          {fileName || "선택된 파일 없음"}
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
