export function usePagination<T>(
  data: T[],
  itemsPerPage: number,
  currentPage: number,
) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;

  const currentItems = data.slice(start, start + itemsPerPage);

  return {
    totalPages,
    currentItems,
  };
}
