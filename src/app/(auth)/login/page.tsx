import CheckeBox from "@/app/components/CheckBox";
import InputBox from "@/app/components/InputBox";
import TypeRadioInput from "@/app/components/TypeRadioInput";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="bg-white w-full p-10 sm:w-160 transition-all">
      <div className="text-center">
        <strong>환영합니다</strong>
        <p className="mbs-2">계정에 로그인하세요</p>
      </div>

      <form action="" className="mbs-10">
        {/* 계정 타입 */}
        <div className="flex gap-2">
          <TypeRadioInput
            label="소비자"
            name="login"
            value="USER"
          />
          <TypeRadioInput
            label="판매자"
            name="login"
            value="BUSINSS"
          />
          <TypeRadioInput
            label="관리자"
            name="login"
            value="ADMIN"
          />
        </div>

        {/* 아이디 패스워드 */}
        <div className="flex flex-col gap-5 mbs-8">
          <InputBox type="text" label="아이디" name="login-id" placeholder="이메일을 입력하세요"/>          
          <InputBox type="text" label="패스워드" name="login-password" placeholder="비밀번호를 입력하세요"/>          
        </div>

        {/* 로그인 서브 컨텐츠 */}
        <div className="flex justify-between mbs-12">
          <CheckeBox name="login-stay" label="로그인 상태유지" />
          <Link href="/" className="text-gray-600">비밀번호 재설정</Link>
        </div>

        {/* 로그인버튼 */}
        <button type="submit" className="w-full py-4 mbs-4 bg-gray-200 cursor-pointer">로그인 버튼</button>
      </form>

      {/* 간편로그인 */}
      <div className="relative border-bs mbs-12">
        <span className="absolute left-1/2 -translate-1/2 bg-white px-6">간편로그인</span>
        {/* 카카오로그인 */}
        <button type="submit" className="w-full py-4 mbs-7 bg-gray-200 cursor-pointer">카카오 로그인</button>
      </div>
    </section>
  )
}