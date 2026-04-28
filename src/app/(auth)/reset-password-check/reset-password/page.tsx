import InputBox from "@/app/components/InputBox";

export default function ResetPasswordPage() {
  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all">
      <div>
        <strong>비밀번호 재설정</strong>
      </div>

      <form action="">
        <div className="flex flex-col gap-5 mbs-8">
          <InputBox type="password" label="비밀번호 입력" name="reset-password" placeholder="비밀번호를 입력하세요"/>          
          <InputBox type="password" label="비밀번호 재입력" name="reset-check-password" placeholder="비밀번호를 재입력하세요"/>          
        </div>
        <p className="mbs-2 text-center text-red-500 invisible">비밀번호가 동일하지 않습니다.</p>

        <button type="submit" className="w-full py-4 mbs-8 bg-gray-200 cursor-pointer">메인페이지로 이동</button>
      </form>
    </div>
  )
}