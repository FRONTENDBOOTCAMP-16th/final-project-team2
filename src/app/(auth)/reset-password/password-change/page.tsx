'use client'

import { passwordChangeAction } from '@/actions/passwordChangeAction'
import PasswordGroup from '@/app/components/PasswordGroup'
import SimpleToast from '@/app/components/SimpleToast'
import { useActionState } from 'react'

export default function ChangePasswordPage() {
  const [state, formAction] = useActionState(passwordChangeAction, null)

  return (
    <div className="w-full rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
      <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
        <strong className="text-[#575A68]">비밀번호 재설정</strong>
      </div>

      <form action={formAction} className="mbs-10 flex flex-col gap-2 pb-4">
        <div className="mbe-4">
          <PasswordGroup />
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
