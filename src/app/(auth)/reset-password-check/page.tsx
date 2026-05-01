import InputBox from "@/app/components/InputBox"

export default function ResetPasswordCheckPage() {
  const errorMessage = '일치하는 아이디가 없습니다'

  return (
    <div className=" bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">비밀번호 재설정</strong>
      </div>

      <form action="" className="flex flex-col gap-2 mbs-10 pb-10">
        <div className="mbe-4">
          <InputBox type="text" label="이름" name="find-id" placeholder="이름을 입력하세요"/>
          <InputBox type="text" label="이메일" name="find-email" placeholder="이메일을 입력하세요"/>
          <InputBox type="text" label="핸드폰 번호" name="find-email" placeholder="핸드폰 번호를 입력하세요"/>
        </div>
        <p className="pbs-4 text-center text-red-500 border-bs border-[#e0e0e0]">{errorMessage || '\u00A0'}</p>

        <button type="button" className="text-center w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">확인</button>
      </form>
    </div>
  )
}