'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  confirm?: string
  cancel?: string
  cancelAction?: () => void
  confirmAction?: () => void
}

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  children,
  confirm,
  cancel,
  cancelAction,
  confirmAction
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 w-full h-full">

      {/* 모달 백그라운드 블러 */}
      <div
        className="animate-in fade-in absolute inset-0 bg-white/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Window */}
      <section
        className="animate-in zoom-in-95 relative flex min-w-90 max-w-200 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] duration-200 dark:bg-black"
        role="dialog"
        aria-modal="true"
      >
        {/* Header / Close Button Area */}
        <div className="flex h-16 items-center justify-between ps-6 pe-2">
          <h2 className="truncate text-xl font-bold text-[#1a1a1a] dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-gray-50 active:scale-90"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={2} className="text-[#333] dark:text-white" />
          </button>
        </div>

        {/* Content Area with Responsive Padding */}
        <div className="max-h-[70vh] text-center overflow-y-auto p-4 pt-0 leading-relaxed text-[#4a4a4a] dark:text-white">
          {children}
        </div>

        {/* Footer Area for Buttons */}
        <div className="flex flex-row justify-end gap-3 p-6 pt-4">
          <button className='flex-1 bg-black text-white py-2 rounded-md dark:bg-[#1b1b1b] dark:border-white dark:border' onClick={confirmAction}>{confirm}</button>
          <button className='flex-1 border py-2 rounded-md' onClick={cancelAction}>{cancel}</button>
        </div>
      </section>
    </div>
  )
}
