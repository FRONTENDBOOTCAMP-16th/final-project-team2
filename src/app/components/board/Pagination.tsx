'use client'

import Link from 'next/link'
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  count: number
  current: number
  link: string
}

export default function Pagination({ count, current, link }: PaginationProps) {
  const ITEMS_PER_PAGE = 10
  const PAGE_GROUP_SIZE = 5

  const totalPage = Math.ceil(count / ITEMS_PER_PAGE)

  // 데이터가 없으면 렌더링하지 않음
  if (totalPage === 0) return null

  // [방어로직 1] 현재 페이지 값 보정 (최소치 1, 최대치 totalPage)
  // URL 파라미터로 비정상적인 값(예: -5, 9999)이 들어와도 에러 없이 처리됩니다.
  const safeCurrent = Math.max(1, Math.min(current, totalPage))

  // 보정된 safeCurrent를 기준으로 그룹 계산
  const startPage =
    Math.floor((safeCurrent - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPage)

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  )

  // 점프 페이지 계산 (최소 1, 최대 totalPage)
  const prevJumpPage = Math.max(safeCurrent - 5, 1)
  const nextJumpPage = Math.min(safeCurrent + 5, totalPage)

  // [방어로직 2] 맨 처음 / 맨 끝 상태 확인 (버튼 비활성화용)
  const isFirstPage = safeCurrent === 1
  const isLastPage = safeCurrent === totalPage

  return (
    <ul className="mt-8 flex w-full items-center justify-center gap-2">
      {/* 1. 첫 페이지로 이동 */}
      <li>
        <Link
          href={isFirstPage ? '#' : `/${link}?page=1`}
          className={`flex items-center justify-center rounded-md p-2 transition-colors ${
            isFirstPage
              ? 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
          }`}
          aria-label="첫 페이지로 이동"
          aria-disabled={isFirstPage}
        >
          <ChevronsLeft size={20} />
        </Link>
      </li>

      {/* 2. 이전 5페이지로 이동 */}
      <li>
        <Link
          href={isFirstPage ? '#' : `/${link}?page=${prevJumpPage}`}
          className={`flex items-center justify-center rounded-md p-2 transition-colors ${
            isFirstPage
              ? 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
          }`}
          aria-label="이전 5페이지로 이동"
          aria-disabled={isFirstPage}
        >
          <ChevronLeft size={20} />
        </Link>
      </li>

      {/* 3. 번호별 페이지 이동 */}
      <li>
        <ul className="flex justify-center gap-1">
          {pageNumbers.map((page) => (
            <li key={page}>
              <Link
                href={`/${link}?page=${page}`}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                  page === safeCurrent
                    ? 'bg-orange-50 dark:bg-orange-900/30 font-bold text-orange-600 dark:text-orange-400' // 현재 페이지 강조 추가
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-current={page === safeCurrent ? 'page' : undefined}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* 4. 다음 5페이지로 이동 */}
      <li>
        <Link
          href={isLastPage ? '#' : `/${link}?page=${nextJumpPage}`}
          className={`flex items-center justify-center rounded-md p-2 transition-colors ${
            isLastPage
              ? 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
          }`}
          aria-label="다음 5페이지로 이동"
          aria-disabled={isLastPage}
        >
          <ChevronRight size={20} />
        </Link>
      </li>

      {/* 5. 마지막 페이지로 이동 */}
      <li>
        <Link
          href={isLastPage ? '#' : `/${link}?page=${totalPage}`}
          className={`flex items-center justify-center rounded-md p-2 transition-colors ${
            isLastPage
              ? 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
          }`}
          aria-label="마지막 페이지로 이동"
          aria-disabled={isLastPage}
        >
          <ChevronsRight size={20} />
        </Link>
      </li>
    </ul>
  )
}
