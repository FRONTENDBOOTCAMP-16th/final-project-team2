'use client'

import dynamic from 'next/dynamic'
import { useState, useActionState } from 'react'
import { createNotice } from '../../../../api/noticeWrite'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">에디터를 불러오는 중입니다...</div>,
})

export default function NoticeWriteForm() {
  const [content, setContent] = useState('')
  const [state, formAction, isPending] = useActionState(createNotice, {
    success: true,
    message: ''
  })

  return (
    <form
      action={formAction}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">공지사항</h2>

      {/* 에러 메시지 표시 영역 */}
      {!state.success && state.message && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium animate-pulse">
          🚨 {state.message}
        </div>
      )}

      {/* 긴급 공지사항 체크박스 */}
      <div className="flex items-center gap-2 px-1">
        <input
          type="checkbox"
          name="important"
          id="important"
          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer disabled:opacity-50"
          disabled={isPending}
        />
        <label htmlFor="important" className="text-sm font-bold text-gray-800 cursor-pointer">
          긴급 공지사항으로 등록
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-gray-800">
          제목 <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
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

      <div className="flex justify-end mt-4">
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
              등록 처리 중...
            </span>
          ) : '공지사항 등록'}
        </button>
      </div>
    </form>
  )
}