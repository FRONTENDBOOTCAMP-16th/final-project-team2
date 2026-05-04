'use client'

import { resetPasswordAction } from "@/actions/resetPasswordAction";
import InputBox from "@/app/components/InputBox";
import { useActionState } from "react";

export default function ResetPasswordPage() {
    const [state, formAction] = useActionState(resetPasswordAction, null)
  
  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">비밀번호 재설정</strong>
      </div>

      <form action={formAction}>
        <div className="flex flex-col gap-2 mbs-10 pb-10">
          <InputBox type="password" label="비밀번호 입력" name="password" placeholder="비밀번호를 입력하세요" error={state?.errors?.password?.[0]} defaultValue={state?.password}/>
          <InputBox type="password" label="비밀번호 재입력" name="confirmPassword" placeholder="비밀번호를 재입력하세요" error={state?.errors?.confirmPassword?.[0]} defaultValue={state?.confirmPassword}/>
        </div>
        {/* <p aria-live="polite" className="pbs-4 border-bs border-[#e0e0e0] text-center text-red-500">비밀번호가 동일하지 않습니다.</p> */}

        <button type="submit" className="w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">비밀번호 변경하기</button>
      </form>
    </div>
  )
}