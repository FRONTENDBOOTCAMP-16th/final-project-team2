'use client'
import { useState, useTransition } from 'react';
import { updateCartQuantity } from '@/actions/cartAction'
import { Plus, Minus, Loader2 } from 'lucide-react'

interface Quantity {
  cartItemId: string
  initialQuantity: number
}

export default function QuantityComponent({ cartItemId, initialQuantity }: Quantity) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);

    startTransition(async () => {
      const result = await updateCartQuantity({ cartItemId, newQuantity });
      if (!result.success) {
        setQuantity(initialQuantity);
      }
    });
  };

  return (
    <div className='flex items-center gap-2 p-1 w-max' role="group" aria-label="수량 조절">
      {/* 감소 버튼 */}
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={isPending || quantity <= 1}
        className='p-1 hover:bg-white rounded transition-colors border-2 border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
      >
        <Minus size={16} />
        <span className='sr-only'>수량 감소</span>
      </button>

      {/* 수량 표시 영역 */}
      <div className="relative w-8 text-center flex justify-center items-center">
        {isPending ? (
          <Loader2 size={16} className="animate-spin text-gray-400" />
        ) : (
          <span className="font-medium text-sm">{quantity}</span>
        )}
        <span className="sr-only">현재 수량</span>
      </div>

      {/* 증가 버튼 */}
      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={isPending}
        className='p-1 hover:bg-white rounded transition-colors border-2 border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
      >
        <Plus size={16} />
        <span className='sr-only'>수량 증가</span>
      </button>
    </div>
  );
}