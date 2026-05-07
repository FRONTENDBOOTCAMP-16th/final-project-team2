'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useActionState } from 'react'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">에디터를 불러오는 중입니다...</div>,
})

export type FormState = { success: boolean; message: string };

export type WriteInitialData = {
  id: string;
  title: string;
  content: string;
  important: boolean;
}

interface FormProps {
  board?: string,
  initialData?: WriteInitialData;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  showImportantCheckbox?: boolean;
}

export default function WriteForm({ board, initialData, action, showImportantCheckbox = false }: FormProps) {
  const [state, formAction, isPending] = useActionState(action, { success: true, message: '' })
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [isImportant, setIsImportant] = useState(initialData?.important || false)
  const [clientError, setClientError] = useState('') // 클라이언트 검증 에러 상태 추가
  const updateID = initialData?.id || null


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 이미지나 iframe(동영상)이 첨부된 경우는 본문이 있는 것으로 간주
    const hasMedia = /<img[^>]*>|<iframe[^>]*>/i.test(content)
    // HTML 태그와 공백(&nbsp;)을 모두 제거하여 순수 텍스트만 추출
    const plainText = content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim()

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

    setClientError('') // 유효성 통과 시 에러 초기화
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg flex flex-col gap-6"
    >
      {/* 수정 시 updateId를 서버 액션에 전달하기 위한 숨김 필드 */}
      {updateID && <input type="hidden" name="updateId" value={updateID} />}

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {board}
      </h2>

      {(clientError || (!state.success && state.message)) && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium animate-pulse">
          🚨 {clientError || state.message}
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
            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer disabled:opacity-50"
            disabled={isPending}
          />
          <label htmlFor="important" className="text-sm font-bold text-gray-800 cursor-pointer">
            긴급 공지사항으로 등록
          </label>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-gray-800">
          제목 <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지사항 제목을 입력하세요 (비워두고 등록하면 에러가 발생합니다)"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow disabled:bg-gray-100 disabled:text-gray-500"
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content-editor" className="text-sm font-bold text-gray-800">
          본문 <span className="text-red-500" aria-hidden="true">*</span>
        </label>

        <ReactQuill value={content} onChange={setContent} theme="snow" className="h-[400px] pb-10" />
        <input type="hidden" name="content" value={content} />
      </div>

      <div className="flex justify-end mt-4 gap-2">

        <Link
          className="px-8 py-3 bg-gray-400 text-white font-bold rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
          href={'/'}
        >
          취소
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              처리 중...
            </span>
          ) : (updateID ? '수정 완료' : '등록 완료')}
        </button>
      </div>
    </form>
  )
}