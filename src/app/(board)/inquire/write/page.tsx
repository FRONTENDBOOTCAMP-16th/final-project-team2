'use client'

import dynamic from 'next/dynamic'
import { useState, FormEvent } from 'react'
import 'react-quill-new/dist/quill.snow.css' 

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">에디터를 불러오는 중입니다...</div>,
})

export default function InquireWriteForm() {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 브라우저의 기본 폼 제출(새로고침) 방지
    
    // FormData를 사용해 input 데이터 추출
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string

    // [방어로직] 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    // Quill은 내용이 비어있을 때 '<p><br></p>'를 반환하기도 하므로 함께 체크합니다.
    if (!content.trim() || content === '<p><br></p>') {
      alert('본문 내용을 작성해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // API 호출 예시 (실제 서버 엔드포인트에 맞게 수정)
      const payload = {
        title,
        content
      }
      console.log('서버로 전송할 데이터:', payload)
      
      // await fetch('/api/notice', { method: 'POST', body: JSON.stringify(payload) })
      
      alert('공지사항이 성공적으로 등록되었습니다.')
      // 성공 후 목록 페이지로 이동 (예: router.push('/notice'))
    } catch (error) {
      console.error('등록 에러:', error)
      alert('등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // 💡 1. 폼의 의미에 맞게 <form> 태그로 감싸고 onSubmit 이벤트를 연결합니다.
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6"
    >
      {/* 💡 2. 입력 필드 그룹화 및 라벨링 (접근성 향상) */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-gray-800">
          제목 <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required
          placeholder="공지사항 제목을 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          aria-required="true"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content-editor" className="text-sm font-bold text-gray-800">
          본문 <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        {/* 💡 3. Quill은 커스텀 UI라 label과 직접 연결이 어려워 id를 감싸는 컨테이너에 부여합니다. */}
        <div id="content-editor" className="bg-white">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            placeholder="공지사항 내용을 상세히 작성해주세요."
            // 에디터 툴바 높이를 고려해 하단 패딩(pb-12)을 주어야 텍스트 입력 영역이 제대로 확보됩니다.
            className="h-[400px] pb-10" 
          />
        </div>
        {/* 💡 4. 브라우저 기본 폼 제출 동작이나 FormData 활용 시 유용한 트릭: 에디터 내용을 hidden input에 동기화합니다. */}
        <input type="hidden" name="content" value={content} />
      </div>

      {/* 💡 5. 제출 버튼 추가 */}
      <div className="flex justify-end mt-8">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '등록 처리 중...' : '공지사항 등록'}
        </button>
      </div>
    </form>
  )
}