'use client'

import { findIdAction } from "@/actions/findIdAction";
import InputBox from "@/app/components/InputBox";
import SimpleToast from "@/app/components/SimpleToast";
import { useActionState } from "react";

export default function FIndIdPage() {
  const [state, formAction] = useActionState(findIdAction, null)

  return (
    <div className="bg-white w-full p-10 sm:w-160 transition-all rounded-2xl shadow-md shadow-[#c7c7c7]">
      <div className="text-2xl text-center border-be pbe-9 border-[#e0e0e0]">
        <strong className="text-[#575A68]">아이디 찾기</strong>
      </div>

      <form action={formAction}>
        <div className="flex flex-col gap-2 mbs-10">
          <InputBox type="text" label="이름" name="name" placeholder="이름을 입력하세요" error={state?.errors?.name?.[0]} defaultValue={state?.name}/>
          <InputBox type="text" label="핸드폰 번호" name="phone" placeholder="핸드폰 번호를 입력하세요 (010-0000-0000)" error={state?.errors?.phone?.[0]} defaultValue={state?.phone}/>
        </div>
        <p aria-live="polite" className="border-be border-[#e0e0e0] pbe-12 mbs-2 text-center text-red-500">{state?.errors?.root?.[0]}</p>
        
        <button type="submit" className="text-center w-full py-4 mbs-12 text-white bg-[#FF6B6B] rounded font-bold cursor-pointer">아이디 찾기</button>
      </form>

      {/* 토스트 메세지 */}
      <SimpleToast text={state?.errors?.root?.[0] ? `아이디찾기 실패: ${state?.errors?.root?.[0]}` : undefined} trigger={state} />
    </div>
  )
}