'use client'

import React, { useState, useActionState } from 'react'
import Modal from '@/app/components/Modal'
import { handleNoticeAction } from '@/actions/noticeAction'

interface NoticeDeleteActionProps {
  id: string
}

export default function NoticeDeleteAction({ id }: NoticeDeleteActionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, formAction] = useActionState(handleNoticeAction, { success: true, message: '' })

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center px-8 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        삭제
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="공지사항 삭제"
        footer={
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 rounded-lg border border-gray-200 font-medium hover:bg-gray-50"
            >
              취소
            </button>
            
            <form action={formAction}>
              {/* 삭제할 ID를 hidden input으로 전달 */}
              <input type="hidden" name="deleteId" value={id} />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
              >
                삭제 확인
              </button>
            </form>
          </div>
        }
      >
        <p className="text-gray-600 py-4">
          정말로 이 공지사항을 삭제하시겠습니까?<br />
          삭제된 데이터는 복구할 수 없습니다.
        </p>
      </Modal>
    </>
  )
}