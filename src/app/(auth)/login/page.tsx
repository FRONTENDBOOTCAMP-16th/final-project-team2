'use client'

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/loginAction";
import CheckeBox from "@/app/components/CheckBox";
import InputBox from "@/app/components/InputBox";
import TypeRadioInput from "@/app/components/TypeRadioInput";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null)

  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">환영합니다</strong>
        <p className="text-sm mbs-1 text-[#575A68]">계정에 로그인하세요</p>
      </div>

      <form action={formAction} className="flex flex-col gap-2 mbs-10 pb-7">
        {/* 계정 타입 */}
        <div className="flex gap-2">
          <TypeRadioInput label="소비자" name="role" value="USER" defaultChecked={state?.role === "USER"}/>
          <TypeRadioInput label="판매자" name="role" value="BUSINESS" defaultChecked={state?.role === "BUSINESS"}/>
          <TypeRadioInput label="관리자" name="role" value="ADMIN" defaultChecked={state?.role === "ADMIN"}/>
        </div>
        <p className="mbs-1 text-red-600" aria-live="polite" aria-hidden="true">{state?.errors?.role?.[0] || '\u00A0'}</p>

        
        {/* 아이디 패스워드 */}
        <div className="flex flex-col gap-2 mbs-2">
          <InputBox type="text" label="이메일" name="email" placeholder="이메일을 입력하세요" error={state?.errors?.email?.[0]} defaultValue={state?.email}/>
          <InputBox type="password" label="패스워드" name="password" placeholder="비밀번호를 입력하세요" error={state?.errors?.password?.[0]} defaultValue={state?.password}/>
        </div>

        {/* 로그인 서브 */}
        <div className="grid grid-cols-1 mbs-2 pbe-9 border-be border-[#e0e0e0]">
          <CheckeBox name="terms" label="로그인 상태유지" />
          <Link href="/signup" className="text-[#575A68] row-start-1 col-start-2 text-right">회원가입</Link>
          <Link href="/find-id" className="text-[#575A68] row-start-2 col-start-2 text-right">아이디 찾기</Link>
          <Link href="/reset-password-check" className="text-[#575A68] row-start-3 col-start-2 text-right">비밀번호 재설정</Link>
        </div>

        {/* 로그인버튼 */}
        <button type="submit" className="w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">로그인 버튼</button>
      </form>

      {/* 간편로그인 */}
      <div className="relative border-bs border-[#e0e0e0]">
        <span className="absolute left-1/2 -translate-1/2 bg-white text-[#575A68] px-6">간편로그인</span>
        {/* 카카오로그인 */}
        <button type="submit" className="w-full py-4 mbs-7 text-black bg-[#FEE500] rounded font-bold cursor-pointer">카카오 로그인</button>
      </div>
    </div>
  )
}