import products from '@/data/dummyproducts.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Product = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 16;
const PAGE_GROUP_SIZE = 5;

const paginationButton = {
  active: 'rounded-full bg-black text-white px-4 py-2',
  default: 'rounded-full bg-gray-100 text-black px-4 py-2',
  disabled: 'rounded-full bg-gray-300 text-gray-500 px-4 py-2 cursor-not-allowed',
};

export default async function Pagination({ searchParams }: Product) {
  const { category, page } = await searchParams;

  const filtered = category ? products.filter(product => product.category === category) : products;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = page === undefined ? 1 : Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (category) params.set('category', category);
    params.set('page', String(pageNumber));

    return `/products?${params.toString()}`;
  };

  return (
    <div className="pagination flex gap-3 justify-center mt-24 mb-20">
      {currentPage === 1 ? (
        <span className={paginationButton.disabled}>prev</span>
      ) : (
        <Link href={createPageLink(currentPage - 1)} className={paginationButton.default}>
          prev
        </Link>
      )}

      {startPage > 1 && (
        <Link href={createPageLink(startPage - 1)} className={paginationButton.default}>
          ...
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

      {endPage < totalPages && (
        <Link href={createPageLink(endPage + 1)} className={paginationButton.default}>
          ...
        </Link>
      )}

      {currentPage === totalPages ? (
        <span className={paginationButton.disabled}>next</span>
      ) : (
        <Link href={createPageLink(currentPage + 1)} className={paginationButton.default}>
          next
        </Link>
      )}
    </div>
  );
}
