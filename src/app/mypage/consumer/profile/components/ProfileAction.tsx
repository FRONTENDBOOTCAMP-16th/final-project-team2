export default function ProfileAction() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <button
        type="button"
        className="text-white w-[672px] h-[50px] bg-black hover:bg-gray-800 transition"
      >
        비밀번호 변경
      </button>
      <button
        type="button"
        className="text-white w-24 h-10 bg-red-700 hover:bg-red-800 transition text-sm"
      >
        회원 탈퇴
      </button>
    </div>
  );
}
