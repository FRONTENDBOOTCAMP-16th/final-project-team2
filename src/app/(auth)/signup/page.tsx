import InputBox from "@/app/components/InputBox";
import CheckeBox from "@/app/components/CheckBox";
import TypeRadioInput from "@/app/components/TypeRadioInput";

export default function SignupPage() {
  return (
    <>
      <div className=" bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
        <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
          <strong className="text-[#575A68]">회원가입</strong>
        </div>

        <form action="">
          {/* 계정 타입 */}
          <div className="flex gap-2 mbs-6">
            <TypeRadioInput label="소비자" name="signup" value="USER" />
            <TypeRadioInput label="판매자" name="signup" value="BUSINSS" />
          </div>

          {/* 아이디 패스워드 */}
          <div className="flex flex-col gap-3 mbs-4">
            <InputBox type="text" label="이름" name="signup-name" placeholder="이름을 입력하세요"/>          
            <InputBox type="text" label="이메일" name="signup-email" placeholder="이메일을 입력하세요"/>          
            <InputBox type="text" label="핸드폰 번호" name="signup-phone" placeholder="핸드폰 번호를 입력하세요"/>          
            <InputBox type="text" label="비밀번호 설정" name="signup-password" placeholder="비밀 번호를 입력하세요"/>          
            <InputBox type="text" label="비밀번호 재확인" name="signup-check-password" placeholder="비밀 번호를 재입력하세요"/>          
          </div>

          <div className="mbs-6 border-be pbe-6 border-[#e0e0e0]">
            <CheckeBox name="login-terms" label="이용약관 동의(필수)" />
          </div>

          <button type="submit" className="w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">회원가입</button>
        </form>
      </div>
      
      <strong className="mbs-12 text-red-600 text-center">현 사이트는 실제로 운영되는 페이지가 아닙니다.<br />개인정보를 넣지 말아주세요</strong>
    </>
  )
}