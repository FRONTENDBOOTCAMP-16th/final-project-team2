'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { useProductFilter } from '@/hooks/useFiltering'
import { usePaginationV2 } from '@/hooks/usePaginationV2'

type PaginationProps = {
  pageSize: number
  totalCount: number
}

export default function Pagination({ pageSize, totalCount }: PaginationProps) {
  const { page, changeFilter, isPending } = useProductFilter()

  const PAGE_GROUP_SIZE = 5

  const {
    totalPages,
    jumpToPrev,
    jumpToNext,
    currentPage,
    endPage,
    startPage,
  } = usePaginationV2({
    totalCount,
    pageSize,
    currentPage: page,
    pageGroupSize: PAGE_GROUP_SIZE,
  })

  const paginationButton = {
    active: 'text-red-600 font-semibold px-4 py-2 dark:text-red-500',
    default:
      'text-black px-4 py-2 hover:text-[#FF6B6B] dark:text-white disabled:cursor-not-allowed disabled:text-gray-400',
    disabled: 'cursor-not-allowed text-gray-500 flex px-4 py-2 -space-x-3',
    pageActive:
      'px-4 py-2 hover:text-[#FF6B6B] flex -space-x-3 disabled:cursor-not-allowed disabled:text-gray-400',
  }

  if (totalCount === 0) return null

  if (
    !Number.isInteger(currentPage) ||
    currentPage < 1 ||
    currentPage > totalPages
  ) {
    notFound()
  }

  const movePage = (nextPage: number) => {
    if (isPending || nextPage === currentPage) return
    changeFilter({ page: nextPage })
  }

  return (
    <nav
      aria-label="상품 목록 페이지네이션"
      className="pagination relative mt-24 mb-20 flex items-center justify-center gap-3"
    >
      {isPending && (
        <div className="absolute inset-0 z-10 bg-white/50 dark:bg-[#25292D]/50" />
      )}

      <button
        type="button"
        aria-label="처음 페이지로 이동"
        disabled={currentPage === 1 || isPending}
        onClick={() => movePage(1)}
        className={
          currentPage === 1
            ? paginationButton.disabled
            : paginationButton.pageActive
        }
      >
        <ChevronLeft />
        <ChevronLeft />
      </button>

      <button
        type="button"
        aria-label={`${jumpToPrev}페이지로 이동`}
        disabled={currentPage === 1 || isPending}
        onClick={() => movePage(jumpToPrev)}
        className={
          currentPage === 1
            ? paginationButton.disabled
            : paginationButton.pageActive
        }
      >
        <ChevronLeft />
      </button>

      <ul className="flex">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index
          const isActive = currentPage === pageNumber
          const isLast = index === endPage - startPage

          return (
            <li key={pageNumber} className="flex items-center">
              <button
                type="button"
                disabled={isActive || isPending}
                onClick={() => movePage(pageNumber)}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive ? paginationButton.active : paginationButton.default
                }
              >
                {pageNumber}
              </button>

              {!isLast && (
                <span aria-hidden className="border-gray-300 text-slate-300">
                  |
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        aria-label={`${jumpToNext}페이지로 이동`}
        disabled={currentPage === endPage || isPending}
        onClick={() => movePage(jumpToNext)}
        className={
          currentPage === endPage
            ? paginationButton.disabled
            : paginationButton.pageActive
        }
      >
        <ChevronRight />
      </button>

      <button
        type="button"
        aria-label="마지막 페이지로 이동"
        disabled={currentPage === totalPages || isPending}
        onClick={() => movePage(totalPages)}
        className={
          currentPage === totalPages
            ? paginationButton.disabled
            : paginationButton.pageActive
        }
      >
        <ChevronRight />
        <ChevronRight />
      </button>
    </nav>
  )
}
