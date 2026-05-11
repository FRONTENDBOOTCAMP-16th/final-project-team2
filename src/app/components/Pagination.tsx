'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useProductFilter } from '@/hooks/useFiltering';
import { usePaginationV2 } from '@/hooks/usePaginationV2';

type PaginationProps = {
  pageSize: number;
  totalCount: number;
};

export default function Pagination({ pageSize, totalCount }: PaginationProps) {
  const { page, createFilterHref } = useProductFilter();
  const PAGE_GROUP_SIZE = 5;
  const { totalPages, isPrev, isNext, jumpToPrev, jumpToNext, currentPage, endPage, startPage } = usePaginationV2({
    totalCount,
    pageSize,
    currentPage: page,
    pageGroupSize: PAGE_GROUP_SIZE,
  });

  const paginationButton = {
    active: 'text-[#FF6B6B] font-semibold px-4 py-2',
    default: 'text-black px-4 py-2 hover:text-[#FF6B6B]',
    disabled: 'cursor-not-allowed text-gray-500 flex px-4 py-2 -space-x-3',
    pageActive: 'px-4 py-2 hover:text-[#FF6B6B] flex -space-x-3',
  };

  if (totalCount === 0) return null;

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  return (
    <nav aria-label="페이지네이션" className="pagination flex gap-3 justify-center mt-24 mb-20 items-center">
      {currentPage === 1 ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronLeft />
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label="처음 페이지로 이동" href={createFilterHref({ page: 1 })} className={paginationButton.pageActive}>
          <ChevronLeft />
          <ChevronLeft />
        </Link>
      )}

      {!isPrev ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label={`${jumpToPrev}페이지로 이동`} href={createFilterHref({ page: jumpToPrev })} className={paginationButton.pageActive}>
          <ChevronLeft />
        </Link>
      )}

      <ul className="flex">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          const isActive = currentPage === pageNumber;
          const isLast = index === endPage - startPage;
          // -------------------------------------------------------------
          return (
            <li key={pageNumber} className="flex items-center">
              <Link
                href={createFilterHref({ page: pageNumber })}
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? paginationButton.active : paginationButton.default}
              >
                {pageNumber}
              </Link>

              {!isLast && (
                <span aria-hidden className="border-gray-300 text-slate-300">
                  |
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {!isNext ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronRight />
        </span>
      ) : (
        <Link aria-label={`${jumpToNext}페이지로 이동`} href={createFilterHref({ page: jumpToNext })} className={paginationButton.pageActive}>
          <ChevronRight />
        </Link>
      )}

      {currentPage === totalPages ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronRight />
          <ChevronRight />
        </span>
      ) : (
        <Link aria-label="마지막 페이지로 이동" href={createFilterHref({ page: totalPages })} className={paginationButton.pageActive}>
          <ChevronRight />
          <ChevronRight />
        </Link>
      )}
    </nav>
  );
}
