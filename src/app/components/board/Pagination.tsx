'use client'

import Link from 'next/link';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  count: number;
  current: number;
}

export default function Pagination({ count, current }: PaginationProps) {
  const ITEMS_PER_PAGE = 20; // 한 페이지당 보여줄 게시물 수 (상황에 맞게 수정하세요)
  const PAGE_GROUP_SIZE = 5; // 한 번에 보여줄 페이지 번호 개수 (1~5, 6~10)

  // 전체 페이지 수 계산
  const totalPage = Math.ceil(count / ITEMS_PER_PAGE);

  // 데이터가 없으면 페이지네이션 숨김 처리
  if (totalPage === 0) return null;

  // 1. 현재 페이지가 속한 그룹의 시작 페이지와 끝 페이지 계산
  // 예: current가 3이면 start=1 / current가 7이면 start=6
  const startPage = Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPage);

  // 시작 페이지부터 끝 페이지까지 배열 생성 (예: [1, 2, 3, 4, 5])
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 2. 화살표 이동 값 계산 (+5, -5)
  // Math.max와 Math.min을 사용해 1페이지보다 작아지거나 끝 페이지보다 커지는 것을 방지합니다.
  const prevJumpPage = Math.max(current - 5, 1);
  const nextJumpPage = Math.min(current + 5, totalPage);

  return (
    <ul className='w-full flex justify-center items-center mt-8 gap-2'>
      {/* 1. 맨 처음으로 (<<) */}
      <li>
        <Link 
          href={`/notice?page=1`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="첫 페이지로 이동"
        >
          <ChevronsLeft size={20} />
        </Link>
      </li>
      
      {/* 2. 이전으로 5칸 (<) */}
      <li>
        <Link 
          href={`/notice?page=${prevJumpPage}`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="이전 5페이지로 이동"
        >
          <ChevronLeft size={20} />
        </Link>
      </li>
      
      {/* 3. 페이지 번호 5개 (1~5) */}
      <li>
        <ul className="flex justify-center gap-1">
          {pageNumbers.map(page => (
            <li key={page}>
              <Link 
                href={`/notice?page=${page}`}
                className={`w-8 h-8 flex justify-center items-center rounded-md transition-colors ${
                  page === current 
                    ? 'text-orange-600 font-bold' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* 4. 다음으로 5칸 (>) */}
      <li>
        <Link 
          href={`/notice?page=${nextJumpPage}`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="다음 5페이지로 이동"
        >
          <ChevronRight size={20} />
        </Link>
      </li>
      
      {/* 5. 맨 끝으로 (>>) */}
      <li>
        <Link 
          href={`/notice?page=${totalPage}`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="마지막 페이지로 이동"
        >
          <ChevronsRight size={20} />
        </Link>
      </li>
    </ul>
  );
}