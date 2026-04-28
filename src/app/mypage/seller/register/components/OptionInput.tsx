"use client";

import { OptionType } from "@/app/mypage/types/sellerOrderItems";
import { ChangeEvent } from "react";
import OptionList from "./OptionList";
import useOptionForm from "@/hooks/useOptionForm";

export default function OptionInput() {
  // 추후 중복 옵션은 작성할 수 없는 중복 제거 방어 로직도 커스텀 훅 함수에 넣어야 됨.
  const { state, actions } = useOptionForm();

  const placeholderOptions = {
    color: "예: 레드, 블루",
    size: "예: S, M, L",
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="productOptions" className="text-sm">
        상품 옵션
      </label>
      <div className="flex flex-row gap-3">
        <label htmlFor="productType" className="sr-only">
          옵션 타입
        </label>
        <select
          name="productType"
          id="productType"
          value={state.optionType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            actions.handleOptionType(e.target.value as OptionType | "")
          }
          className="p-1 text-sm"
        >
          <option value="">선택</option>
          <option value="color">색상</option>
          <option value="size">사이즈</option>
        </select>
        <input
          type="text"
          id="productOptions"
          value={state.optionValue}
          onChange={(e) => actions.handleInput(e.target.value)}
          className="w-120 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
          placeholder={
            state.optionType
              ? placeholderOptions[state.optionType]
              : "값을 입력하세요"
          }
        />
        <button
          type="button"
          onClick={actions.handleAddOptions}
          className="border px-4"
        >
          옵션 추가
        </button>
      </div>
      <OptionList options={state.options} />
      {state.error && <p className="text-red-500">{state.error}</p>}
    </div>
  );
}
