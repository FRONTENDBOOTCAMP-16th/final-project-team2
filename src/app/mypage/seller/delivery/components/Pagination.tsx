import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        aria-disabled={currentPage === 1}
        className={`cursor-pointer aria-disabled:cursor-not-allowed `}
        aria-label="맨 처음 페이지"
      >
        <ChevronsLeft aria-hidden="true" />
      </button>

      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        aria-disabled={currentPage === 1}
        className={`cursor-pointer aria-disabled:cursor-not-allowed `}
        aria-label="이전 페이지"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`cursor-pointer px-2 py-1 ${currentPage === i + 1 ? "text-red-500 font-bold" : ""}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        aria-disabled={currentPage === totalPages}
        className={` cursor-pointer aria-disabled:cursor-not-allowed `}
        aria-label="다음 페이지"
      >
        <ChevronRight aria-hidden="true" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        aria-disabled={currentPage === totalPages}
        className={`cursor-pointer aria-disabled:cursor-not-allowed `}
        aria-label="맨 마지막 페이지"
      >
        <ChevronsRight aria-hidden="true" />
      </button>
    </div>
  );
}
