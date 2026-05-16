import type { BoardCard } from '@/types/boards'
import Link from 'next/link'
import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage'

interface PostCardList {
  data: BoardCard
  isImportant?: boolean
  isAnswered?: boolean
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
    <li className="w-full border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
      <Link
        href={`/${link}/${data.id}`}
        className="flex w-full items-center gap-4 py-4"
        aria-label={`게시글: ${data.title}`}
      >
        {link === 'inquire' && (
          <div className="flex w-full items-center gap-2 xl:w-1/3">
            <div className="relative h-10 w-10 shrink-0 xl:h-16 xl:w-16">
              <ProductImage
                priority
                src={data.product?.thumbnail_image || ''}
                alt={data.product?.name || ''}
              />
            </div>
            <p className="text-sm">{data.product?.name}</p>
          </div>
        )}

        <div className="flex w-full">
          <div className="flex w-1/2 items-center justify-start gap-1">
            {important && (
              <strong
                className="shrink-0 bg-orange-600 px-2 py-1 text-xs font-normal text-white"
                aria-label="중요 공지"
              >
                필독
              </strong>
            )}

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

          <div className="w-1/4 shrink-0 text-center text-gray-500 dark:text-gray-400">
            <span className="sr-only">작성일</span>
            {formattedDate}
          </div>
        </div>
      </Link>
    </li>
  )
}
