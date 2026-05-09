import { useState } from 'react';

export function usePagination<T>(
  data: T[],
  itemsPerPage: number,
  externalPage?: number,
) {
  const [internalPage, setInternalPage] = useState(1);
  
  // 외부에서 페이지 값을 주면 그것을 사용하고, 아니면 내부 상태 사용
  const currentPage = externalPage !== undefined ? externalPage : internalPage;
  const setCurrentPage = setInternalPage;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(start, start + itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
  };
}
