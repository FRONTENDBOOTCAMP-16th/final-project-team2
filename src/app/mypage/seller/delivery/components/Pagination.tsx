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
    <div className="flex justify-center gap-2 mt-12.5 text-[18px]">
      <button
        onClick={() => onPageChange(1)}
        aria-disabled={currentPage === 1}
        className={` aria-disabled:cursor-not-allowed`}
      >
        {"<<"}
      </button>

      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        aria-disabled={currentPage === 1}
        className={` aria-disabled:cursor-not-allowed`}
      >
        {"<"}
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          disabled={currentPage === i + 1}
          aria-disabled={currentPage === i + 1}
          className={` px-2 py-1${currentPage === i + 1 ? "text-red-500 font-bold" : ""}
      
     
    `}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        aria-disabled={currentPage === totalPages}
        className={` aria-disabled:cursor-not-allowed`}
      >
        {">"}
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        aria-disabled={currentPage === totalPages}
        className={` aria-disabled:cursor-not-allowed`}
      >
        {">>"}
      </button>
    </div>
  );
}
