import InputBox from "@/app/components/InputBox";
import Link from "next/link";

export default function FIndIdPage() {
  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all">
      <div>
        <strong>아이디 찾기</strong>
      </div>

      <form action="">
        <div className="flex flex-col gap-5 mbs-8">
          <InputBox type="text" label="이름" name="find-id-name" placeholder="이름을 입력하세요"/>
          <InputBox type="text" label="이메일" name="find-id-email" placeholder="이메일을 입력하세요"/>
          <InputBox type="text" label="핸드폰 번호" name="find-id-phone" placeholder="핸드폰 번호를 입력하세요" />
        </div>
        <p className="mbs-2 text-center text-red-500 invisible">아이디가 존재하지 않습니다</p>

        
        {/* 실제 사용은 button으로 사용예정 연결확인을 위해 Link로 임시 연결*/}
        <Link href={'/find-id/find-id-result'} className="block text-center w-full py-4 mbs-8 bg-gray-200 cursor-pointer">아이디 찾기</Link>
        {/* <button type="submit" className="w-full py-4 mbs-8 bg-gray-200 cursor-pointer">아이디 찾기</button> */}
      </form>
    </div>
  )
}