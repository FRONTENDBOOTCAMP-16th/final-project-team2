'use client'

import Modal from '@/app/components/Modal'
import { addCartItem } from '@/actions/cartAction'
import { SelectedOption } from '@/app/lib/cart.types'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState, useTransition } from 'react'

type CartButtonProps = {
  productId: string
  optionData: SelectedOption | null
  quantity: number
  disabled?: boolean
}

const CartButton = ({
  productId,
  optionData,
  quantity,
  disabled = false,
}: CartButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { isLogin } = useAuth()

  const handleAddCart = () => {
    if (!optionData) {
      alert('옵션을 선택해주세요.')
      return
    }

    startTransition(async () => {
      try {
        await addCartItem({
          productId,
          optionData,
          quantity,
        })

        setIsOpen(true)
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : '장바구니 담기에 실패했습니다.',
        )
      }
    })
  }

  return (
    <Fragment>
      <button
        type="button"
        disabled={disabled || isPending}
        className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-border bg-card py-4 text-base font-semibold text-foreground transition duration-300 hover:border-primary hover:bg-muted active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={isLogin ? handleAddCart : () => setIsOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>{isPending ? '담는 중...' : '장바구니'}</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isLogin ? '장바구니에 담기' : '로그인이 필요합니다'}
      >
        {isLogin ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">
                이 상품을 장바구니에 담았습니다
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                장바구니로 이동하시겠습니까?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border-2 border-border bg-card py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                아니요
              </button>
              <Link
                href="/cart"
                className="flex items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                예
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">
                장바구니에 상품을 담으려면 로그인이 필요합니다.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                로그인 페이지로 이동하시겠습니까?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border-2 border-border bg-card py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                아니요
              </button>

              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                예
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  )
}

export default CartButton
