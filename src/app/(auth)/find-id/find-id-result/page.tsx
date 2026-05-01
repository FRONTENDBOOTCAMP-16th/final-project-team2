import Link from "next/link";

export default function FindIdResultPage() {
  return (
    <div className="flex flex-col bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">아이디 찾기</strong>
      </div>

      <div className="bg-[#EEEEEE] text-center px-8 py-5 mbs-10">
        <strong className="text-[#575A68] bold">id@gmail.com</strong>
      </div>

      <div className="flex pbs-4 mbs-10 border-bs border-[#e0e0e0]">
        <Link href="/" className="text-center w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">메인으로 돌아가기</Link>
      </div>
    </div>
  )
}