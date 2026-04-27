import products from '@/data/dummyproducts.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PaginationProps = {
  mainCategory: string;
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 16;
const PAGE_GROUP_SIZE = 5;

const paginationButton = {
  active: 'text-[#FF6B6B] font-semibold px-4 py-2',
  default: 'text-black px-4 py-2',
  disabled: 'cursor-not-allowed text-gray-500 flex px-4 py-2 -space-x-3',
  pageActive: 'px-4 py-2 hover:text-[#FF6B6B] flex -space-x-3',
};

export default async function Pagination({ searchParams, mainCategory }: PaginationProps) {
  const { category, page } = await searchParams;

  const filtered = category ? products.filter(product => product.category === category) : products;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = page === undefined ? 1 : Number(page);

  if (totalPages > 0 && (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages)) {
    notFound();
  }

  if (totalPages <= 1) return null;

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (category) params.set('category', category);
    params.set('page', String(pageNumber));

    return `/products/${mainCategory}?${params.toString()}`;
  };

  return (
    <div className="pagination flex gap-3 justify-center mt-24 mb-20">
      {currentPage === 1 ? (
        <span className={paginationButton.disabled}>
          <ChevronLeft />
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label="처음으로 이동하기" href={createPageLink(1)} className={paginationButton.pageActive}>
          <ChevronLeft />
          <ChevronLeft />
        </Link>
      )}

      {currentPage === 1 ? (
        <span className={paginationButton.disabled}>
          <ChevronLeft />
        </span>
      ) : (
        <Link aria-label="이전 페이지로 이동" href={createPageLink(currentPage - 1)} className={paginationButton.pageActive}>
          <ChevronLeft />
        </Link>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        const isActive = currentPage === pageNumber;

        return (
          <Link key={pageNumber} href={createPageLink(pageNumber)} className={isActive ? paginationButton.active : paginationButton.default}>
            {pageNumber}
          </Link>
        );
      })}

      {currentPage === totalPages ? (
        <span className={paginationButton.disabled}>
          <ChevronRight />
        </span>
      ) : (
        <Link aria-label="다음 페이지로 이동" href={createPageLink(currentPage + 1)} className={paginationButton.pageActive}>
          <ChevronRight />
        </Link>
      )}

      {currentPage === totalPages ? (
        <span className={paginationButton.disabled}>
          <ChevronRight />
          <ChevronRight />
        </span>
      ) : (
        <Link aria-label="마지막 페이지로 이동" href={createPageLink(totalPages)} className={paginationButton.pageActive}>
          <ChevronRight />
          <ChevronRight />
        </Link>
      )}
    </div>
  );
}
