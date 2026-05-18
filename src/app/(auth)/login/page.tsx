'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { loginAction } from '@/actions/loginAction'
import InputBox from '@/app/components/InputBox'
import TypeRadioInput from '@/app/components/TypeRadioInput'
import SimpleToast from '@/app/components/SimpleToast'
import { emailSchema, passwordSchema } from '@/app/lib/auth'

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null)

  return (
    <div className="w-full rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
      <h2 className='sr-only'>로그인</h2>
      <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
        <strong className="text-[#575A68]">환영합니다</strong>
        <p className="mbs-1 text-sm text-[#575A68]">계정에 로그인하세요</p>
      </div>

      <form action={formAction} className="mbs-10 flex flex-col gap-2 pb-7">
        {/* 계정 타입 */}
        <div className="flex gap-2">
          <TypeRadioInput
            label="소비자"
            name="role"
            value="USER"
            defaultChecked={state?.role === 'USER'}
          />
          <TypeRadioInput
            label="판매자"
            name="role"
            value="BUSINESS"
            defaultChecked={state?.role === 'BUSINESS'}
          />
          <TypeRadioInput
            label="관리자"
            name="role"
            value="ADMIN"
            defaultChecked={state?.role === 'ADMIN'}
          />
        </div>
        <p className="text-red-600" aria-live="polite">
          {state?.errors?.role?.[0]}
        </p>

        {/* 아이디 패스워드 */}
        <div className="mbs-2 flex flex-col gap-2">
          <InputBox
            type="text"
            label="이메일"
            name="email"
            placeholder="이메일을 입력하세요"
            schema={emailSchema}
          />
          <InputBox
            type="password"
            label="패스워드"
            name="password"
            placeholder="비밀번호를 입력하세요"
            schema={passwordSchema}
          />
        </div>

        <p
          className="mbs-1 text-center text-red-600"
          aria-live="polite"
          aria-hidden="true"
        >
          {state?.errors?.root?.[0]}
        </p>

        {/* 로그인 서브 */}
        <div className="grid grid-cols-1 border-be border-[#e0e0e0] pbe-9">
          <Link
            href="/signup"
            className="col-start-2 row-start-1 text-right text-[#575A68]"
          >
            회원가입
          </Link>
          <Link
            href="/reset-password"
            className="col-start-2 row-start-3 text-right text-[#575A68]"
          >
            비밀번호 재설정
          </Link>
        </div>

        {/* 로그인버튼 */}
        <button
          type="submit"
          className="mbs-12 w-full cursor-pointer rounded bg-black py-4 font-bold text-white"
        >
          로그인 버튼
        </button>
      </form>

      {/* 간편로그인 */}
      {/* <div className="relative border-bs border-[#e0e0e0]">
        <span className="absolute left-1/2 -translate-1/2 bg-white px-6 text-[#575A68]">
          간편로그인
        </span>
        <button
          type="submit"
          className="mbs-7 w-full cursor-pointer rounded bg-[#FEE500] py-4 font-bold text-black"
        >
          카카오 로그인
        </button>
      </div> */}

      {/* 토스트 메세지 */}
      <SimpleToast
        text={
          state?.errors?.root?.[0]
            ? `로그인 실패: ${state?.errors?.root?.[0]}`
            : undefined
        }
        trigger={state}
      />
    </div>
  )
}
