'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useInquireStore } from '@/store/useInquireStore'
import { useState, useActionState } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import { LoaderCircle } from 'lucide-react'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="p-4 text-gray-500">에디터를 불러오는 중입니다...</div>
  ),
})

export type FormState = { success: boolean; message: string }

export type WriteInitialData = {
  id?: string
  reply_id?: string
  title: string
  content: string
  important: boolean
}

interface FormProps {
  type?: string
  board?: string
  initialData?: WriteInitialData
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  showImportantCheckbox?: boolean
  link?: string
}

export default function WriteForm({
  type,
  board,
  initialData,
  action,
  showImportantCheckbox = false,
  link,
}: FormProps) {
  // 클라이언트 컴포넌트라 state로 제어하는게 낫더라고요.
  // react-qull 자체가 클라이언트 환경에서 작동합니다.
  const [state, formAction, isPending] = useActionState(action, {
    success: true,
    message: '',
  })
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [isImportant, setIsImportant] = useState(
    initialData?.important || false,
  )
  const [clientError, setClientError] = useState('')

  // 이거는 업데이트 / 답변 유무 인데, 일단 둡니다.
  const updateID = initialData?.id || null
  const replyID = initialData?.reply_id || null

  // 이 부분은 1:1 문의할때 선택한 제품 부분 ID입니다.
  // 아래 hidden input으로 들어가요.
  const { selectedProduct } = useInquireStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 방어로직입니다.
    // react-qull은 null로 해도 (&nbsp;)로 처리가 되기에 이런 내용을 추가해야 하더라고요.
    const hasMedia = /<img[^>]*>|<iframe[^>]*>/i.test(content)
    const plainText = content
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp/g, '')
      .trim()

    if (!title.trim()) {
      e.preventDefault()
      setClientError('제목을 입력해주세요.')
      return
    }
    if (!hasMedia && !plainText) {
      e.preventDefault()
      setClientError('본문 내용을 작성해주세요.')
      return
    }
    setClientError('')
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-lg bg-white p-6 shadow-sm"
    >
      {/* 질문 작성 시 제품정보 위한 히든 input 추가 */}
      {type === 'inquire' && (
        <input
          type="hidden"
          name="product"
          id="product"
          value={selectedProduct || ''}
        />
      )}

      {/* 수정 시 updateId를 서버 액션에 전달하기 위한 숨김 필드 */}
      {updateID && <input type="hidden" name="updateId" value={updateID} />}
      {replyID && <input type="hidden" name="replyId" value={replyID} />}

      <h2 className="mb-2 text-2xl font-bold text-gray-800">{board}</h2>

      {(clientError || (!state.success && state.message)) && (
        <div className="animate-pulse rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {clientError || state.message}
        </div>
      )}

      {/* 긴급 공지사항 체크박스 */}
      {showImportantCheckbox && (
        <div className="flex items-center gap-2 px-1">
          <input
            type="checkbox"
            name="important"
            id="important"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500 disabled:opacity-50"
            disabled={isPending}
          />
          <label
            htmlFor="important"
            className="cursor-pointer text-sm font-bold text-gray-800"
          >
            긴급 공지사항으로 등록
          </label>
        </div>
      )}

      {!replyID && (
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-bold text-gray-800">
            제목{' '}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${board} 제목을 입력하세요 (비워두고 등록하면 에러가 발생합니다)`}
            className="w-full rounded-md border border-gray-300 p-3 transition-shadow focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
            disabled={isPending}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="content-editor"
          className="text-sm font-bold text-gray-800"
        >
          본문{' '}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>

        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="h-100 pb-10"
        />
        <input type="hidden" name="content" value={content} />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Link
          className="flex min-w-40 items-center justify-center rounded-md bg-gray-400 px-8 py-3 font-bold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-400"
          href={`/${link}`}
        >
          취소
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="flex min-w-40 items-center justify-center rounded-md bg-orange-600 px-8 py-3 font-bold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-400"
        >
          {isPending ? (
            <p className="flex items-center gap-2">
              <span className="animate-spin">
                <LoaderCircle />
              </span>
              처리 중...
            </p>
          ) : updateID ? (
            '수정 완료'
          ) : (
            '등록 완료'
          )}
        </button>
      </div>
    </form>
  )
}
