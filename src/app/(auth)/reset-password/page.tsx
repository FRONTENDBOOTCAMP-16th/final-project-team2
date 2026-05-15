'use client'

import { resetPasswordAction } from '@/actions/resetPasswordAction'
import InputBox from '@/app/components/InputBox'
import PasswordGroup from '@/app/components/PasswordGroup'
import SimpleToast from '@/app/components/SimpleToast'
import { emailSchema, nameSchema, phoneSchema } from '@/app/lib/auth'
import { useActionState } from 'react'

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(resetPasswordAction, null)

  return (
    <div className="w-full rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
      <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
        <strong className="text-[#575A68]">비밀번호 재설정</strong>
      </div>

      <form action={formAction} className="mbs-10 flex flex-col gap-2 pb-4">
        <div className="mbe-4">
          <InputBox
            type="text"
            label="이름"
            name="name"
            placeholder="이름을 입력하세요"
            schema={nameSchema}
          />
          <InputBox
            type="text"
            label="이메일"
            name="email"
            placeholder="이메일을 입력하세요"
            schema={emailSchema}
          />
          <InputBox
            type="text"
            label="핸드폰 번호"
            name="phone"
            placeholder="핸드폰 번호를 입력하세요 (010-0000-0000)"
            schema={phoneSchema}
          />
        </div>
        <p className="border-bs border-[#e0e0e0] pbs-4 text-center text-red-500">
          {state?.errors?.root?.[0]}
        </p>

        <button
          type="submit"
          className="mbs-12 w-full cursor-pointer rounded bg-black py-4 text-center font-bold text-white"
        >
          확인
        </button>
      </form>

      {/* 토스트 메세지 */}
      <SimpleToast
        text={
          state?.errors?.root?.[0]
            ? `비밀번호 재설정 실패: ${state?.errors?.root?.[0]}`
            : undefined
        }
        trigger={state}
      />
    </div>
  )
}
