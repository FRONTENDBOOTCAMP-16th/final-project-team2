'use client'

import { useState } from 'react'
import { OptionType, ProductOptionType } from '@/app/lib/products.types'

/**
 * @param initialOptions 수정 페이지 등에서 기존 옵션을 불러올 때 사용하는 초기값
 */

export default function useOptionForm(
  initialOptions: ProductOptionType[] = [],
) {
  const [optionType, setOptionType] = useState<OptionType | ''>('')
  const [optionValue, setOptionValue] = useState('')

  // 초기값이 배열인지 검사하여 에러를 방지합니다.
  const [options, setOptions] = useState<ProductOptionType[]>(
    Array.isArray(initialOptions) ? initialOptions : [],
  )
  const [error, setError] = useState('')

  const handleAddOptions = () => {
    if (!optionType) {
      setError('옵션 타입을 선택하세요')
      return
    }

    if (!optionValue.trim()) {
      setError('옵션 값을 입력하세요')
      return
    }

    setOptions((prev) => {
      // prev가 배열이 아닐 경우(iterable 에러)를 대비한 방어 로직
      const safePrev = Array.isArray(prev) ? prev : []

      // 쉼표를 기준으로 나눠서 배열로 생성
      const parsedValues = optionValue
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)

      return [
        ...safePrev,
        {
          name: optionType as OptionType,
          values: parsedValues,
        },
      ]
    })

    setOptionType('')
    setOptionValue('')
    setError('')
  }

  const handleDeleteOption = (name: OptionType) => {
    setOptions((prev) => {
      // prev가 배열이 아닐 경우를 대비한 방어 로직
      const safePrev = Array.isArray(prev) ? prev : []
      return safePrev.filter((option) => option.name !== name)
    })
  }

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
