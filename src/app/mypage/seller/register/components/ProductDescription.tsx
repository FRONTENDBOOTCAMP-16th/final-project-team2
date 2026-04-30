"use client";

import { ChangeEvent, useState } from "react";

export default function ProductDescription() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const changeValue = e.target.value;
    setValue(changeValue);

    // 글자 미입력 시 함수 종료
    if (changeValue.length === 0) {
      setError("");
      return;
    }

    // 글자 수 제한에 따라 오류 메시지 표시
    if (changeValue.length < 10) {
      return setError("최소 10자 이상 입력해야 합니다.");
    } else if (changeValue.length > 500) {
      setError("최소 500자까지 입력 가능합니다.");
    } else setError("");
  };

  return (
    <div className="flex flex-col gap-2 ">
      {/* 상품 정보 */}
      <label htmlFor="productDescription" className="text-sm">
        상품 정보
      </label>
      <div className="relative w-2xl">
        <textarea
          name="productDescription"
          value={value}
          id="productDescription"
          className=" w-full h-50  resize-none border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3 pr-16 pb-8"
          onChange={handleValue}
          maxLength={500}
          placeholder="예) 정밀하게 지울 수 있는 펜형 지우개"
        />
        <p className="text-sm text-gray-500 absolute bottom-2 right-3">
          {value.length} / 500
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
