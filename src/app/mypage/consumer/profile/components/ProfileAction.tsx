"use client";

import { useUser } from "@/app/mypage/context/UserContext";

export default function ProfileAction() {
  // 전역 Context에서 role을 직접 꺼내옵니다.
  const { role } = useUser();

  return (
    <div className="flex flex-col gap-3 mt-4">
      <button
        type="button"
        className="text-white w-full max-w-2xl h-12 bg-black hover:bg-gray-800 transition"
      >
        비밀번호 변경
      </button>
      <button
        type="button"
        className="text-white w-24 h-12 bg-red-700 hover:bg-red-800 transition text-sm"
      >
        {/* Context에서 가져온 role에 따라 텍스트가 바뀝니다 */}
        {role === "seller" ? "폐점 신청" : "회원 탈퇴"}
      </button>
    </div>
  );
}
