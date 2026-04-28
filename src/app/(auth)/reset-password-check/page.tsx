import InputBox from "@/app/components/InputBox"
import Link from "next/link"

interface ResetPasswordCheckProps {
  children: string
}

export default function ResetPasswordCheckPage({ children }: ResetPasswordCheckProps) {
  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all">
      <div>
        <strong>비밀번호 재설정</strong>
      </div>

      <form action="" className="mbs-10">
        <div className="flex flex-col gap-2">
          <InputBox type="text" label="이름" name="find-id" placeholder="이름을 입력하세요"/>
          <InputBox type="text" label="이메일" name="find-email" placeholder="이메일을 입력하세요"/>
          <InputBox type="text" label="핸드폰 번호" name="find-email" placeholder="핸드폰 번호를 입력하세요"/>
        </div>
        <p className="mbs-2 text-center text-red-500 invisible">입력하신 정보로 가입 된 회원은 존재하지 않습니다.</p>

        {/* 실제 사용은 button으로 사용예정 연결확인을 위해 Link로 임시 연결*/}
        <Link href="/reset-password" className="block text-center w-full py-4 mbs-8 bg-gray-200 cursor-pointer">확인</Link>
        {/* <button type="submit" className="w-full py-4 mbs-8 bg-gray-200 cursor-pointer">확인</button> */}
      </form>
    </div>
  )
}