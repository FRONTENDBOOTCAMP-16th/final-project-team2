'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import TotalPrice from './TotalPrice'

type Props={
  maxCount: number,
  price: number
  discount_rate: number
}

const Quantity = ({ maxCount, price, discount_rate }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const activeStyle = 'cursor-pointer border bg-white px-2.5 py-2 text-black'
  const disableStyle = 'cursor-not-allowed border px-2.5 py-2 text-gray-600'
  const handleIncrease = ()=>{
    setQuantity( q => q + 1)
  }
  const handleDecrease = () => {
  if (quantity <= 1) return;
    setQuantity( q => q - 1)
  }
  
  return (
    <div>
      <div className="inline-block">
        <label htmlFor="quantity" className="text-[18px] text-gray-700">
          수량
        </label>
  
        <div className="mt-4 flex items-center gap-1">
          <button
            type="button"
            aria-label="한개 제거"
            className={quantity > 1? activeStyle:disableStyle}
            onClick={handleDecrease}
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
            className="cursor-pointer border bg-white px-2.5 py-2 text-black"
            onClick={handleIncrease}
          >
            <Plus className="w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <TotalPrice price={price} discount_rate={discount_rate} quantity={quantity} />
      </div>
    </div>
  )
}

export default Quantity
