'use client'

import { useState } from 'react'
import { PenSquare, Star } from 'lucide-react'
import Modal from '@/app/components/Modal'
import { useRouter } from 'next/navigation'

type Props = {
  disabled?: boolean
  onClick?: () => void
  onSubmit?: (data: {
    title: string
    content: string
    grade: number
  }) => Promise<void>
}
const ReviewBtn = ({ disabled = false, onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [grade, setGrade] = useState(5)
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('리뷰 제목과 내용을 입력해주세요.')
      return
    }

    try {
      await onSubmit?.({
        title,
        content,
        grade,
      })

      router.refresh()

      setIsOpen(false)
      setTitle('')
      setContent('')
      setGrade(5)
      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
      }, 2500)
    } catch (error) {
      console.error(error)
      alert('리뷰 등록에 실패했습니다.')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <PenSquare className="h-4 w-4" />
        리뷰 작성하기
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="리뷰 작성">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              평점
            </label>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const current = index + 1

                return (
                  <button
                    key={current}
                    type="button"
                    onClick={() => setGrade(current)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        current <= grade ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={current <= grade ? 'currentColor' : 'none'}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="review-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              리뷰 제목
            </label>

            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="리뷰 제목을 입력해주세요"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="review-content"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상품에 대한 솔직한 후기를 남겨주세요"
              rows={5}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm transition outline-none focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            리뷰 등록하기
          </button>
        </div>
      </Modal>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full bg-gray-800 px-6 py-3 text-sm text-white shadow-lg">
            리뷰작성이 완료되었습니다
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewBtn
