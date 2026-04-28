'use client'

import Link from 'next/link'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  count: number
  current: number
}

export default function Pagination({ count, current }: PaginationProps) {
  const ITEMS_PER_PAGE = 10 
  const PAGE_GROUP_SIZE = 5

  const totalPage = Math.ceil(count / ITEMS_PER_PAGE)

  if (totalPage === 0) return null

  const startPage = Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPage)

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  const prevJumpPage = Math.max(current - 5, 1)
  const nextJumpPage = Math.min(current + 5, totalPage)

  return (
    <ul className='w-full flex justify-center items-center mt-8 gap-2'>
      <li>
        <Link 
          href={`/notice?page=1`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="첫 페이지로 이동"
        >
          <ChevronsLeft size={20} />
        </Link>
      </li>
      
      <li>
        <Link 
          href={`/notice?page=${prevJumpPage}`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="이전 5페이지로 이동"
        >
          <ChevronLeft size={20} />
        </Link>
      </li>
      
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

      <li>
        <Link 
          href={`/notice?page=${nextJumpPage}`} 
          className="p-2 flex items-center justify-center hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors"
          aria-label="다음 5페이지로 이동"
        >
          <ChevronRight size={20} />
        </Link>
      </li>
      
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
  )
}