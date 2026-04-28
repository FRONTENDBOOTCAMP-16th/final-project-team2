"use client";
import { useState } from "react";

// 클라이언트 컴포넌트 (업로드 미리보기) 기능 구현 필요
export default function ProductImg() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <p id="productImageLabel" className="text-sm">
        상품 이미지
      </p>

      <div className="flex flex-row gap-3 items-center">
        <input
          type="file"
          id="productImage"
          aria-labelledby="productImageLabel"
          accept="image/png, image/jpeg"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="border w-30 h-30 aspect-auto flex items-center justify-center">
          이미지 미리 보기 (추후에 수정할 예정)
        </div>
        <label
          htmlFor="productImage"
          className={`cursor-pointer border px-4 h-10 flex items-center font-bold
            ${file ? "bg-[#FF6B6B] text-white " : "bg-white text-gray-600 "}`}
        >
          {file ? "이미지 선택 완료" : "이미지 선택"}
        </label>
        <span aria-live="polite" className="text-sm text-gray-500">
          {file?.name || "선택된 파일 없음"}
        </span>
      </div>
    </div>
  );
}
