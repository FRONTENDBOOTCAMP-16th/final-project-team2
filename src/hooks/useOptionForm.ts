'use client'

import { useState } from 'react'
import { Option, OptionType } from '@/app/lib/products'

/**
 * @param initialOptions 수정 페이지 등에서 기존 옵션을 불러올 때 사용하는 초기값
 */
export default function useOptionForm(initialOptions: Option[] = []) {
  const [optionType, setOptionType] = useState<OptionType | "">("");
  const [optionValue, setOptionValue] = useState("");

  // 초기값이 배열인지 검사하여 에러를 방지합니다.
  const [options, setOptions] = useState<Option[]>(
    Array.isArray(initialOptions) ? initialOptions : [],
  );
  const [error, setError] = useState("");

  const handleAddOptions = () => {
    if (!optionType) {
      setError('옵션 타입을 선택하세요')
      return
    }

    if (!optionValue.trim()) {
      setError('옵션 값을 입력하세요')
      return
    }

    setOptions((prev) => [
      ...prev,
      {
        name: optionType,
        values: [optionValue],
      },
    ]);

    setOptionType('')
    setOptionValue('')
    setError('')
  }

  const handleDeleteOption = (name: OptionType) => {
    setOptions((prev) => prev.filter((option) => option.name !== name));
  };

  const handleOptionType = (value: OptionType | '') => {
    setOptionType(value)
  }

  const handleInput = (value: string) => {
    setOptionValue(value)
  }

  return {
    state: {
      optionType,
      optionValue,
      options,
      error,
    },
    actions: {
      handleAddOptions,
      handleDeleteOption,
      handleOptionType,
      handleInput,
      setOptions,
      setError,
    },
  }
}
