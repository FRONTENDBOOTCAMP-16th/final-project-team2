'use client'

import { resetPasswordAction } from "@/actions/resetPasswordAction"
import InputBox from "@/app/components/InputBox"
import PasswordGroup from "@/app/components/PasswordGroup"
import SimpleToast from "@/app/components/SimpleToast"
import { useActionState } from "react"

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(resetPasswordAction, null)

  return (
    <div className=" bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">비밀번호 재설정</strong>
      </div>

      <form action={formAction} className="flex flex-col gap-2 mbs-10 pb-4">
        <div className="mbe-4">
          <InputBox type="text" label="이름" name="name" placeholder="이름을 입력하세요" error={state?.errors?.name?.[0]} defaultValue={state?.name}/>
          <InputBox type="text" label="이메일" name="email" placeholder="이메일을 입력하세요" error={state?.errors?.email?.[0]} defaultValue={state?.email}/>
          <InputBox type="text" label="핸드폰 번호" name="phone" placeholder="핸드폰 번호를 입력하세요 (010-0000-0000)" error={state?.errors?.phone?.[0]} defaultValue={state?.phone} />
          
          <PasswordGroup
            passwordError={state?.errors?.password?.[0]}
            confirmError={state?.errors?.confirmPassword?.[0]}
            defaultPassword={state?.password}
            defaultConfirm={state?.confirmPassword}
          />
        </div>
        <p className="pbs-4 text-center text-red-500 border-bs border-[#e0e0e0]">{state?.errors?.root?.[0]}</p>

        <button type="submit" className="text-center w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">확인</button>
      </form>

      {/* 토스트 메세지 */}
      <SimpleToast text={state?.errors?.root?.[0] ? `비밀번호 재설정 실패: ${state?.errors?.root?.[0]}` : undefined} trigger={state} />
    </div>
  )
}