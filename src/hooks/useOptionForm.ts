"use client";

import { useState } from "react";
import { Option, OptionType } from "@/app/mypage/types/sellerOrderItems";

export default function useOptionForm() {
  const [optionType, setOptionType] = useState<OptionType | "">("");
  const [optionValue, setOptionValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState("");

  const handleAddOptions = () => {
    if (!optionType) {
      setError("옵션 타입을 선택하세요");
      return;
    }

    if (!optionValue.trim()) {
      setError("옵션 값을 입력하세요");
      return;
    }

    setOptions((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: optionType,
        value: optionValue,
      },
    ]);

    setOptionType("");
    setOptionValue("");
    setError("");
  };

  const handleOptionType = (value: OptionType | "") => {
    setOptionType(value);
  };

  const handleInput = (value: string) => {
    setOptionValue(value);
  };

  return {
    state: {
      optionType,
      optionValue,
      options,
      error,
    },
    actions: {
      handleAddOptions,
      handleOptionType,
      handleInput,
      setOptions,
    },
  };
}
