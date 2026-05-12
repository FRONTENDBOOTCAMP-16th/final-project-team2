'use client'
import React, { useState, useTransition } from 'react';
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

    // 낙관적 UI 업데이트 (사용자 경험 향상)
    setQuantity(newQuantity);

    // 서버에 업데이트 요청
    startTransition(async () => {
      const result = await updateCartQuantity({ cartItemId, newQuantity });

      if (!result.success) {
        // 실패 시 이전 수량으로 롤백 (여기서는 간단히 처리했지만, 필요에 따라 이전 상태 저장 필요)
        alert(result.message || '수량 변경에 실패했습니다.');
        setQuantity(initialQuantity);
      }
    });
  };

  return (
    <div className='flex items-center gap-2 rounded-md p-1 w-max'>
      {/* 감소 버튼 */}
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={isPending || quantity <= 1}
        className='p-1 hover:bg-white rounded disabled:opacity-50 transition-colors border-2 border-gray-300'
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
        className='p-1 hover:bg-white rounded disabled:opacity-50 transition-colors  border-2 border-gray-300'
      >
        <Plus size={16} />
        <span className='sr-only'>수량 증가</span>
      </button>
    </div>
  );
}