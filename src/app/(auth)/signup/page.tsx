'use client'

import { useActionState } from 'react'
import InputBox from '@/app/components/InputBox'
import CheckeBox from '@/app/components/CheckBox'
import TypeRadioInput from '@/app/components/TypeRadioInput'
import { signupAction } from '@/actions/signupAction'
import PasswordGroup from '@/app/components/PasswordGroup'
import SimpleToast from '@/app/components/SimpleToast'

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, null)

  return (
    <>
      <div className="w-full rounded-2xl bg-white p-10 shadow-md shadow-[#c7c7c7] transition-all sm:w-160">
        <div className="border-be border-[#e0e0e0] pbe-9 text-center text-2xl">
          <strong className="text-[#575A68]">회원가입</strong>
        </div>

        <form action={formAction}>
          {/* 계정 타입 */}
          <p
            className="mbs-1 text-center font-bold text-red-600"
            aria-live="polite"
            aria-hidden="true"
          >
            {state?.errors?.root?.[0]}
          </p>
          <div className="mbs-6 flex gap-2">
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
          </div>
          <p
            className="mbs-1 text-red-600"
            aria-live="polite"
            aria-hidden="true"
          >
            {state?.errors?.role?.[0] || '\u00A0'}
          </p>

          {/* 아이디 패스워드 */}
          <div className="mbs-4 flex flex-col gap-3">
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
              label="이메일"
              name="email"
              placeholder="이메일을 입력하세요"
              error={state?.errors?.email?.[0]}
              defaultValue={state?.email}
            />
            <InputBox
              type="text"
              label="핸드폰 번호"
              name="phone"
              placeholder="핸드폰 번호를 입력하세요 (010-0000-0000)"
              error={state?.errors?.phone?.[0]}
              defaultValue={state?.phone}
            />
            <PasswordGroup
              passwordError={state?.errors?.password?.[0]}
              confirmError={state?.errors?.confirmPassword?.[0]}
              defaultPassword={state?.password}
              defaultConfirm={state?.confirmPassword}
            />
          </div>

          <div className="mbs-6 border-be border-[#e0e0e0] pbe-6">
            <CheckeBox
              name="terms"
              label="이용약관 동의(필수)"
              error={state?.errors?.terms?.[0]}
              defaultChecked={state?.terms === 'on'}
            />
          </div>

          <button
            type="submit"
            className="mbs-12 w-full cursor-pointer rounded bg-black py-4 font-bold text-white"
          >
            회원가입
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

      <strong className="mbs-12 text-center text-red-600">
        현 사이트는 실제로 운영되는 페이지가 아닙니다.
        <br />
        개인정보를 넣지 말아주세요
      </strong>
    </>
  )
}
