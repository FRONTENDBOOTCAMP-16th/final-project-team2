import Link from 'next/link'

export default function SignupIdResultPage() {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
      <h2 className='sr-only'>회원가입 결과</h2>
      <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
        <strong className="text-[#575A68]">회원가입 완료</strong>
      </div>

      <div className="mbs-10 bg-[#EEEEEE] px-8 py-5 text-center">
        <strong className="bold text-[#575A68]">
          회원가입이 완료되었습니다
        </strong>
      </div>

      <div className="mbs-10 flex border-bs border-[#e0e0e0] pbs-4">
        <Link
          href="/login"
          className="mbs-12 w-full cursor-pointer rounded bg-black py-4 text-center font-bold text-white"
        >
          로그인으로 이동하기
        </Link>
      </div>
    </div>
  )
}
