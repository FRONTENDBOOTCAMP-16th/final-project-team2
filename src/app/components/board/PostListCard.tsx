import type { BoardCard } from '@/types/boards'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardList {
  data: BoardCard
  isImportant?: boolean
  isAnswered?: boolean // 💡 1. 타입 정의 추가 (선택적 프로퍼티)
  link: string
}

export default function PostListCard({
  data,
  isImportant,
  isAnswered,
  link,
}: PostCardList) {
  const formattedDate = data.created_at.split('T')[0]
  const important = isImportant ?? data.important

  return (
    <li className="w-full border-b border-gray-100 transition-colors hover:bg-gray-50">
      <Link
        href={`/${link}/${data.id}`}
        className="flex w-full items-center gap-4 py-4"
        aria-label={`게시글: ${data.title}`}
      >
        {link === 'inquire' && (
          <div className="flex w-full items-center gap-2 xl:w-1/3">
            <div className="relative h-10 w-10 shrink-0 xl:h-16 xl:w-16">
              <Image
                src={data.product?.thumbnail_image || ''}
                alt={data.product?.name || ''}
                fill
                className="rounded object-cover"
              />
            </div>
            <p className="text-sm">{data.product?.name}</p>
          </div>
        )}

        <div className="flex w-full">
          <div className="flex w-1/2 items-center justify-start gap-1">
            {/* 공지사항 중요 배지 */}
            {important && (
              <strong
                className="shrink-0 bg-orange-600 px-2 py-1 text-xs font-normal text-white"
                aria-label="중요 공지"
              >
                필독
              </strong>
            )}

            {/* 💡 2. QnA 답변 상태 배지: isAnswered가 undefined가 아닐 때만 렌더링 */}
            {isAnswered !== undefined &&
              (isAnswered ? (
                <strong
                  className="shrink-0 bg-green-600 px-2 py-1 text-xs font-normal text-white"
                  aria-label="답변 완료"
                >
                  답변완료
                </strong>
              ) : (
                <strong
                  className="shrink-0 bg-gray-400 px-2 py-1 text-xs font-normal text-white"
                  aria-label="답변 대기"
                >
                  답변대기
                </strong>
              ))}

            <p className="ml-1 truncate">{data.title}</p>
          </div>

          <div className="w-1/4 shrink-0 text-center">
            <span className="sr-only">작성자</span>
            <p className="truncate">{data.writer?.nickname || '관리자'}</p>
          </div>

          <div className="w-1/4 shrink-0 text-center text-gray-500">
            <span className="sr-only">작성일</span>
            {formattedDate}
          </div>
        </div>
      </Link>
    </li>
  )
}
