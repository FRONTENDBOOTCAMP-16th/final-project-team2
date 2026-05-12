type UsePaginationParams = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  pageGroupSize?: number;
};

export function usePaginationV2({ totalCount, pageSize, currentPage, pageGroupSize = 5 }: UsePaginationParams) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const isPrev = startPage > 1;
  const isNext = endPage < totalPages;

  const jumpToPrev = startPage - 1;
  const jumpToNext = endPage + 1;

  return {
    currentPage,
    totalPages,
    startPage,
    endPage,
    isPrev,
    isNext,
    jumpToPrev,
    jumpToNext,
  };
}
