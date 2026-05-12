'use client'

import { findIdAction } from '@/actions/findIdAction'
import InputBox from '@/app/components/InputBox'
import SimpleToast from '@/app/components/SimpleToast'
import { useActionState } from 'react'

export default function FIndIdPage() {
  const [state, formAction] = useActionState(findIdAction, null)

  return (
    <div className="w-full rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
      <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
        <strong className="text-[#575A68]">아이디 찾기</strong>
      </div>

      <form action={formAction}>
        <div className="mbs-10 flex flex-col gap-2">
          <InputBox
            type="text"
            label="이름"
            name="name"
            placeholder="이름을 입력하세요"
            error={state?.errors?.name?.[0]}
            defaultValue={state?.name}
          />
          <InputBox
            type="text"
            label="핸드폰 번호"
            name="phone"
            placeholder="핸드폰 번호를 입력하세요 (010-0000-0000)"
            error={state?.errors?.phone?.[0]}
            defaultValue={state?.phone}
          />
        </div>
        <p
          aria-live="polite"
          className="mbs-2 border-be border-[#e0e0e0] pbe-12 text-center text-red-500"
        >
          {state?.errors?.root?.[0]}
        </p>

        <button
          type="submit"
          className="mbs-12 w-full cursor-pointer rounded bg-[#FF6B6B] py-4 text-center font-bold text-white"
        >
          아이디 찾기
        </button>
      </form>

      {/* 토스트 메세지 */}
      <SimpleToast
        text={
          state?.errors?.root?.[0]
            ? `아이디찾기 실패: ${state?.errors?.root?.[0]}`
            : undefined
        }
        trigger={state}
      />
    </div>
  )
}
