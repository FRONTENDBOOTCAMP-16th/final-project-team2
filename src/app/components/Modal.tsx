'use client'

import { ReactNode, useEffect, useRef, useId } from 'react'
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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timeoutId = setTimeout(() => {
        titleRef.current?.focus()
      }, 50)
      return () => clearTimeout(timeoutId)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 포커스 트랩 (Focus Trap)
  useEffect(() => {
    const handleTab = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === titleRef.current || document.activeElement === dialogRef.current) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="animate-in fade-in absolute inset-0 bg-white/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <section
        ref={dialogRef}
        className="animate-in zoom-in-95 relative flex w-full max-w-200 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <div className="flex h-16 items-center px-4 pr-14 sm:px-6 sm:pr-16 lg:px-10 lg:pr-20">
          <h2
            id={titleId}
            ref={titleRef}
            tabIndex={-1}
            className="truncate text-xl font-bold text-[#1a1a1a] focus:outline-none"
          >
            {title}
          </h2>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4 pt-0 leading-relaxed text-[#4a4a4a] sm:p-6 sm:pt-0 lg:p-10 lg:pt-0">
          {children}
        </div>
        {footer && (
          <div className="flex flex-col justify-end gap-3 p-4 pt-0 sm:flex-row sm:p-6 sm:pt-0 lg:p-10 lg:pt-0">
            {footer}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-gray-50 active:scale-90 sm:right-4 sm:top-2 lg:right-8"
          aria-label="닫기"
        >
          <X size={24} strokeWidth={2} className="text-[#333]" />
        </button>
      </section>
    </div>
  )
}
