const GradeTooltip = () => (
  <div className="group relative flex items-center">
    <button
      type="button"
      aria-label="등급 산정 조건 보기"
      className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[10px] flex items-center justify-center cursor-help focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      ?
    </button>
    <div className="absolute left-7 w-64 p-3 bg-white border border-gray-200 shadow-md hidden group-hover:block group-focus-within:block z-10 text-xs text-gray-700">
      <p className="font-bold mb-2 pb-1 border-b border-gray-100">
        등급 산정 조건
      </p>
      <ul className="space-y-1">
        <li>
          • <span className="font-semibold text-orange-900">BRONZE</span>: 0 ~
          50,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-gray-500">SILVER</span>: 50,000
          ~ 100,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-yellow-500">GOLD</span>:
          100,000원 이상
        </li>
      </ul>
    </div>
  </div>
);

export default function UserProfile() {
  // TODO: 실제 로그인 연동 시 서버에서 받은 유저 정보로 교체 예정
  const role = "consumer" as "consumer" | "seller";
  const userGrade = "BRONZE";
  const userName = "사용자";

  return (
    <div className="flex flex-col mb-10">
      <div className="w-[204px] pb-6 flex flex-col items-center bg-white">
        {/* 이미지 영역 임시로 border 처리 - 추후에 이미지로 변경 예정 */}
        <div className="w-[204px] aspect-square bg-white shrink-0 border" />

        <div className="flex items-center justify-center gap-2 pt-5 pb-2">
          <div className="bg-black text-white inline-block px-2 py-0.5 text-xs font-bold">
            {userGrade}
          </div>
          {role !== "seller" && <GradeTooltip />}
        </div>
        <p className="text-lg w-full text-center">
          <strong className="font-bold text-black">{userName}</strong>님
          반갑습니다.
        </p>
      </div>
    </div>
  );
}
