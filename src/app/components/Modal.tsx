'use client'

import React, { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with Glassmorphism effect */}
      <div
        className="animate-in fade-in absolute inset-0 bg-white/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Window */}
      <section
        className="animate-in zoom-in-95 relative flex w-full max-w-200 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header / Close Button Area */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
          <h2 className="truncate text-xl font-bold text-[#1a1a1a]">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-gray-50 active:scale-90"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={2} className="text-[#333]" />
          </button>
        </div>

        {/* Content Area with Responsive Padding */}
        <div className="max-h-[70vh] overflow-y-auto p-4 pt-0 leading-relaxed text-[#4a4a4a] sm:p-6 sm:pt-0 lg:p-10 lg:pt-0">
          {children}
        </div>

        {/* Footer Area for Buttons */}
        {footer && (
          <div className="flex flex-col justify-end gap-3 p-4 pt-0 sm:flex-row sm:p-6 sm:pt-0 lg:p-10 lg:pt-0">
            {footer}
          </div>
        )}
      </section>
    </div>
  )
}
