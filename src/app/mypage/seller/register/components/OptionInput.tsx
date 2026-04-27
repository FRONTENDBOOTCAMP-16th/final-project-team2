"use client";

import { OptionType } from "@/app/mypage/types/sellerOrderItems";
import { ChangeEvent } from "react";
import OptionList from "./OptionList";
import useOptionForm from "@/hooks/useOptionForm";

export default function OptionInput() {
  const { state, actions } = useOptionForm();

  const placeholderOptions = {
    color: "예: 레드, 블루",
    size: "예: S, M, L",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3">
        <label htmlFor="productOptions">상품 옵션</label>
        <select
          name="productType"
          id="productType"
          value={state.optionType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            actions.handleOptionType(e.target.value as OptionType | "")
          }
        >
          <option value="">선택</option>
          <option value="color">색상</option>
          <option value="size">사이즈</option>
        </select>
        <input
          type="text"
          id="productOptions"
          onChange={(e) => actions.handleInput(e.target.value)}
          className="border w-100"
          placeholder={
            state.optionType
              ? placeholderOptions[state.optionType]
              : "값을 입력하세요"
          }
        />
        <button
          type="button"
          onClick={actions.handleAddOptions}
          className="shirink-0 border"
        >
          옵션 추가
        </button>
      </div>
      <OptionList options={state.options} />
      {state.error && <p className="text-red-500">{state.error}</p>}
    </div>
  );
}
