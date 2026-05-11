"use client";

import { OptionType } from "@/app/lib/products";
import useOptionForm from "@/hooks/useOptionForm";
import { ChangeEvent } from "react";
import OptionList from "./OptionList";
import { ChevronDown } from "lucide-react";

type Props = {
  optionForm: ReturnType<typeof useOptionForm>;
  error?: string;
};

export default function OptionInput({ optionForm }: Props) {
  // 추후 중복 옵션은 작성할 수 없는 중복 제거 방어 로직도 커스텀 훅 함수에 넣어야 됨.
  // 색깔에 사이즈, 사이즈에 색깔 옵션 입력할 수 없는 로직도 구현 필요

  const placeholderOptions = {
    color: "예: 레드, 블루",
    size: "예: S, M, L",
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm mb-3">상품 옵션</legend>
      <div className="flex flex-row gap-3 items-baseline">
        <label htmlFor="productType" className="sr-only">
          옵션 타입
        </label>
        <div className="relative">
          <select
            name="productType"
            id="productType"
            value={optionForm.state.optionType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              optionForm.actions.handleOptionType(
                e.target.value as OptionType | "",
              )
            }
            className=" appearance-none border border-gray-300  rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-describedby="optionTypeHelp"
          >
            <option value="">선택</option>
            <option value="color">색상</option>
            <option value="size">사이즈</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 w-4 h-4" />
        </div>

        <div className="flex flex-row gap-4">
          <label htmlFor="productOptions" className="sr-only">
            옵션 값
          </label>
          <input
            type="text"
            id="productOptions"
            value={optionForm.state.optionValue}
            onChange={(e) => optionForm.actions.handleInput(e.target.value)}
            className="w-120 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
            placeholder={
              optionForm.state.optionType
                ? placeholderOptions[optionForm.state.optionType]
                : "값을 입력하세요"
            }
            aria-describedby="optionValueHelp"
          />
          <input
            type="hidden"
            name="productOptions"
            value={JSON.stringify(optionForm.state.options)}
          />
          <button
            type="button"
            onClick={optionForm.actions.handleAddOptions}
            className="border px-4"
          >
            옵션 추가
          </button>
        </div>
        <p id="optionTypeHelp" className="sr-only">
          옵션 종류를 선택하세요
        </p>

        <p id="optionValueHelp" className="sr-only">
          선택한 옵션의 값을 입력하세요
        </p>
      </div>
      <OptionList
        options={optionForm.state.options}
        onRemove={optionForm.actions.handleDeleteOption}
      />
      {optionForm.state.error && (
        <p className="text-red-500">{optionForm.state.error}</p>
      )}
    </fieldset>
  );
}
