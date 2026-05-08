import type { BoardCard } from "@/types/boards"
import Link from "next/link"

interface PostCardList {
  data: BoardCard
  isImportant?: boolean
  isAnswered?: boolean // 💡 1. 타입 정의 추가 (선택적 프로퍼티)
  link: string
}

export default function PostListCard({ data, isImportant, isAnswered, link }: PostCardList) {

  const formattedDate = data.created_at.split('T')[0]
  const important = isImportant ?? data.important

  return (
    <li className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <Link 
        href={`/${link}/${data.id}`}  
        className='flex items-center w-full py-4' 
        aria-label={`게시글: ${data.title}`}
      >
        <div className="flex gap-1 items-center justify-start w-1/2">
          {/* 공지사항 중요 배지 */}
          {important && (
            <strong className="text-white px-2 py-1 bg-orange-600 text-xs font-normal shrink-0" aria-label="중요 공지">
              필독
            </strong>
          )}
          
          {/* 💡 2. QnA 답변 상태 배지: isAnswered가 undefined가 아닐 때만 렌더링 */}
          {isAnswered !== undefined && (
            isAnswered ? (
              <strong className="text-white px-2 py-1 bg-green-600 text-xs font-normal shrink-0" aria-label="답변 완료">
                답변완료
              </strong>
            ) : (
              <strong className="text-white px-2 py-1 bg-gray-400 text-xs font-normal shrink-0" aria-label="답변 대기">
                답변대기
              </strong>
            )
          )}

          <p className="truncate ml-1">{data.title}</p>
        </div>

        <div className="w-1/4 text-center shrink-0">
          <span className="sr-only">작성자</span>
          <p className="truncate">{data.writer?.nickname || '관리자'}</p>
        </div>

        <div className="w-1/4 text-center shrink-0 text-gray-500">
          <span className="sr-only">작성일</span>
          {formattedDate}
        </div>
      </Link>
    </li>
  )
}