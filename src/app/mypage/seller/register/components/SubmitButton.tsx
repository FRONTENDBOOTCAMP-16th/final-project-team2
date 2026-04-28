"use client";

// 아래의 인풋 하나라도 안 채워져 있으면 제출이 안됨
import { Pen } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  // 팬딩(pending) 상태일 경우, 브라우저 기본 작동 방지
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) e.preventDefault();
  };

  return (
    <button
      type="submit"
      aria-disabled={pending}
      onClick={handleClick}
      className={`flex flex-row self-end  p-2 ${pending ? "cursor-not-allowed opacity-50" : " bg-[#FF6B6B] text-white"}`}
    >
      <Pen className="mr-2" />
      {pending ? "등록 중..." : "상품 등록"}
    </button>
  );
}
