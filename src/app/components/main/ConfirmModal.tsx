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
        className="animate-in fade-in absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Window */}
      <section
        className="animate-in zoom-in-95 relative flex min-w-90 max-w-200 flex-col overflow-hidden rounded-3xl bg-card shadow-[0_20px_50px_rgba(0,0,0,0.1)] duration-200 border border-border"
        role="dialog"
        aria-modal="true"
      >
        {/* Header / Close Button Area */}
        <div className="flex h-16 items-center justify-between ps-6 pe-2 border-b border-border">
          <h2 className="truncate text-xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-muted active:scale-90"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={2} className="text-foreground" />
          </button>
        </div>

        {/* Content Area with Responsive Padding */}
        <div className="max-h-[70vh] text-center overflow-y-auto p-6 leading-relaxed text-foreground">
          {children}
        </div>

        {/* Footer Area for Buttons */}
        <div className="flex flex-row justify-end gap-3 p-6 pt-4 border-t border-border">
          <button className='flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors' onClick={confirmAction}>{confirm}</button>
          <button className='flex-1 border-2 border-border py-3 rounded-xl font-semibold text-foreground hover:bg-muted transition-colors' onClick={cancelAction}>{cancel}</button>
        </div>
      </section>
    </div>
  )
}
