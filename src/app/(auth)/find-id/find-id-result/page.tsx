import Link from "next/link";

export default function FindIdResultPage() {
  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all">
      <div>
        <strong>아이디 찾기</strong>
      </div>

      <div className="border text-center px-8 py-5 mbs-4">
        <strong className="text-gray-400 bold">id@gmail.com</strong>
      </div>

      <Link href="/" className="block text-center w-full py-4 mbs-8 bg-gray-200 cursor-pointer">메인으로 돌아가기</Link>
    </div>
  )
}