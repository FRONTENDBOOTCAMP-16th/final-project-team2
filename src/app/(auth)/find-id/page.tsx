import InputBox from "@/app/components/InputBox";

export default function FIndIdPage() {
  const errorMessage = '아이디가 존재하지 않습니다.'

  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">아이디 찾기</strong>
      </div>

      <form action="">
        <div className="flex flex-col gap-2 mbs-10">
          <InputBox type="text" label="이름" name="find-id-name" placeholder="이름을 입력하세요"/>
          <InputBox type="text" label="이메일" name="find-id-email" placeholder="이메일을 입력하세요"/>
          <InputBox type="text" label="핸드폰 번호" name="find-id-phone" placeholder="핸드폰 번호를 입력하세요" />
        </div>
        <p aria-live="polite" className="border-be border-[#e0e0e0] pbe-12 mbs-2 text-center text-red-500">{errorMessage || '\u00A0'}</p>
        
        <button type="submit" className="text-center w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">아이디 찾기</button>
      </form>
    </div>
  )
}