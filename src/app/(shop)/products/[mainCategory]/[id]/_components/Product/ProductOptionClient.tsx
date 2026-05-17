'use client'

import { CircleQuestionMarkIcon, Coins } from 'lucide-react'
import { useMemo, useState } from 'react'
import TotalPrice from './TotalPrice'
import CartButton from './CartButton'
import { Minus, Plus } from 'lucide-react'
import { ProductOptionType } from '@/app/lib/products.types'
import { SelectedOption } from '@/app/lib/cart.types'
import HeartButton from './HeartButton'

interface Props {
  productId: string
  price: number
  discount_rate: number
  maxCount: number
  options: ProductOptionType[] | null
}

export default function ProductOptionClient({
  productId,
  price,
  discount_rate,
  maxCount,
  options,
}: Props) {
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')

  const parsedOptions = Array.isArray(options)
    ? (options as ProductOptionType[])
    : []

  const colorOption = parsedOptions.find((option) => option.name === 'color')
  const sizeOption = parsedOptions.find((option) => option.name === 'size')

  const colors = Array.isArray(colorOption?.values) ? colorOption.values : []
  const sizes = Array.isArray(sizeOption?.values) ? sizeOption.values : []

  const activeStyle = 'cursor-pointer border bg-white px-2.5 py-2 text-black'
  const disableStyle = 'cursor-not-allowed border px-2.5 py-2 text-gray-600'

  const handleIncrease = () => {
    if (quantity >= maxCount) return
    setQuantity((q) => q + 1)
  }

  const handleDecrease = () => {
    if (quantity <= 1) return
    setQuantity((q) => q - 1)
  }

  const optionData = useMemo<SelectedOption>(() => {
    const selectedOptions: SelectedOption = {}

    if (color) {
      selectedOptions.color = [color]
    }

    if (size) {
      selectedOptions.size = [size]
    }

    return selectedOptions
  }, [color, size])

  const hasColorOption =
    options?.some((option) => option.name === 'color') ?? false
  const hasSizeOption =
    options?.some((option) => option.name === 'size') ?? false

  return (
    <>
      {colors.length > 0 && (
        <div>
          <label htmlFor="color" className="text-[18px]">
            색상
          </label>

          <select
            className="mt-2 block w-full border py-3"
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="" className="dark:bg-[#25292D] dark:text-white">
              색상을 선택해주세요
            </option>

            {colors.map((color: string) => (
              <option
                key={color}
                value={color}
                className="dark:bg-[#25292D] dark:text-white"
              >
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {sizes.length > 0 && (
        <>
          <div className="mt-6 flex items-center">
            <label htmlFor="size" className="mt-1 text-[18px]">
              사이즈
            </label>

            <button type="button" className="ml-5 cursor-pointer">
              <CircleQuestionMarkIcon />
            </button>
          </div>

          <div className="mt-4">
            <select
              className="mt-2 block w-full border py-3"
              name="size"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="" className="dark:bg-[#25292D] dark:text-white">
                사이즈를 선택해주세요
              </option>

              {sizes.map((size: string) => (
                <option
                  key={size}
                  value={size}
                  className='className="dark:bg-[#25292D] dark:text-white"'
                >
                  {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="mt-8">
        <div className="inline-block">
          <label htmlFor="quantity" className="text-[18px] text-gray-700">
            수량
          </label>

          <div className="mt-4 flex items-center gap-1">
            <button
              type="button"
              aria-label="한개 제거"
              className={quantity > 1 ? activeStyle : disableStyle}
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="w-4" />
            </button>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={maxCount}
              value={quantity}
              readOnly
              className="w-20 appearance-none border py-2 text-center outline-none"
            />

            <button
              type="button"
              aria-label="한개 추가"
              className={quantity >= maxCount ? disableStyle : activeStyle}
              onClick={handleIncrease}
              disabled={quantity >= maxCount}
            >
              <Plus className="w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <TotalPrice
            price={price}
            discount_rate={discount_rate}
            quantity={quantity}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="mt-4 flex gap-3">
          <CartButton
            productId={productId}
            optionData={optionData}
            quantity={quantity}
            disabled={
              (hasColorOption && !optionData?.color) ||
              (hasSizeOption && !optionData?.size)
            }
          />
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-gray-700"
            title="현재 사이트에서 구매가 불가합니다"
          >
            <Coins className="h-5 w-5 text-white" />
            <span className="text-white">구매하기</span>
          </button>
          <div className="mt-2 flex aspect-square w-15 items-center justify-center rounded-xl border border-gray-300 bg-white p-2 transition hover:bg-gray-100">
            <HeartButton productId={productId} initialLiked={false} />
          </div>
        </div>
      </div>
    </>
  )
}
