'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { useState, useActionState } from 'react'
import Modal from '@/app/components/Modal'
import { handleInquireAction } from '@/actions/inquireAction'

interface InquireDeleteActionProps {
  id: string
}

export default function InquireDeleteAction({ id }: InquireDeleteActionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, formAction] = useActionState(handleInquireAction, {
    success: true,
    message: '',
  })

  const { pending } = useFormStatus()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center bg-red-500 px-8 py-2 text-white transition-colors hover:bg-red-600"
      >
        삭제
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="1:1문의글 삭제"
        footer={
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-gray-200 px-6 py-2 font-medium hover:bg-gray-50"
            >
              취소
            </button>

            <form action={formAction}>
              {/* 삭제할 ID를 hidden input으로 전달 */}
              <input type="hidden" name="deleteId" value={id} />
              <button
                type="submit"
                className="rounded-lg bg-red-500 px-6 py-2 font-medium text-white hover:bg-red-600"
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    삭제 처리 중
                  </>
                ) : (
                  '삭제하기'
                )}
              </button>
            </form>
          </div>
        }
      >
        <p className="py-4 text-gray-600">
          정말로 이 게시글을 삭제하시겠습니까?
          <br />
          삭제된 데이터는 복구할 수 없습니다.
        </p>
      </Modal>
    </>
  )
}
