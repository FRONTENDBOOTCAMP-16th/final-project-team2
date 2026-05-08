import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Products } from '../lib/products';

type PaginationProps = {
  mainCategory: string;
  pageSize: number;
  baseUrl: string;
  products: Products[];
  subcategory?: string;
  sort?: string;
  page?: number;
  category?: string;
  totalCount: number;
};

export default async function Pagination({ mainCategory, baseUrl, pageSize, category, page, sort, totalCount }: PaginationProps) {
  const PAGE_GROUP_SIZE = 5;

  const paginationButton = {
    active: 'text-[#FF6B6B] font-semibold px-4 py-2',
    default: 'text-black px-4 py-2 hover:text-[#FF6B6B]',
    disabled: 'cursor-not-allowed text-gray-500 flex px-4 py-2 -space-x-3',
    pageActive: 'px-4 py-2 hover:text-[#FF6B6B] flex -space-x-3',
  };

  const keyword = category?.trim();

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = page === undefined ? 1 : Number(page);

  if (totalCount === 0) return null;

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const isPrev = startPage > 1;
  const isNext = endPage < totalPages;

  const jumpToPrev = startPage - 1;
  const jumpToNext = endPage + 1;

  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (keyword) params.set('category', keyword);
    if (sort) params.set('sort', sort);

    params.set('page', String(pageNumber));

    return `${baseUrl}/${mainCategory}?${params.toString()}`;
  };

  return (
    <nav aria-label="페이지네이션" className="pagination flex gap-3 justify-center mt-24 mb-20 items-center">
      {currentPage === 1 ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronLeft />
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label="처음 페이지로 이동" href={createPageLink(1)} className={paginationButton.pageActive}>
          <ChevronLeft />
          <ChevronLeft />
        </Link>
      )}

      {!isPrev ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label={`${jumpToPrev}페이지로 이동`} href={createPageLink(jumpToPrev)} className={paginationButton.pageActive}>
          <ChevronLeft />
        </Link>
      )}

      <ul className="flex">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          const isActive = currentPage === pageNumber;
          const isLast = index === endPage - startPage;

          return (
            <li key={pageNumber} className="flex items-center">
              <Link
                href={createPageLink(pageNumber)}
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
        <Link aria-label={`${jumpToNext}페이지로 이동`} href={createPageLink(jumpToNext)} className={paginationButton.pageActive}>
          <ChevronRight />
        </Link>
      )}

      {currentPage === totalPages ? (
        <span className={paginationButton.disabled} aria-hidden>
          <ChevronRight />
          <ChevronRight />
        </span>
      ) : (
        <Link aria-label="마지막 페이지로 이동" href={createPageLink(totalPages)} className={paginationButton.pageActive}>
          <ChevronRight />
          <ChevronRight />
        </Link>
      )}
    </nav>
  );
}
