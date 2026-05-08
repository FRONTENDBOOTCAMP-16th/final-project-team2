'use client';

import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with Glassmorphism effect */}
      <div
        className="absolute inset-0 bg-white/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Window */}
      <section
        className="relative w-full max-w-[800px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header / Close Button Area */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-[64px]">
          <h2 className="text-xl font-bold text-[#1a1a1a] truncate">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-[48px] h-[48px] flex items-center justify-center hover:bg-gray-50 rounded-full transition-all active:scale-90"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={2} className="text-[#333]" />
          </button>
        </div>

        {/* Content Area with Responsive Padding */}
        <div className="p-4 sm:p-6 lg:p-10 pt-0 sm:pt-0 lg:pt-0 overflow-y-auto max-h-[70vh] text-[#4a4a4a] leading-relaxed">
          {children}
        </div>

        {/* Footer Area for Buttons */}
        {footer && (
          <div className="p-4 sm:p-6 lg:p-10 pt-0 sm:pt-0 lg:pt-0 flex flex-col sm:flex-row justify-end gap-3">
            {footer}
          </div>
        )}
      </section>
    </div>
  );
}
