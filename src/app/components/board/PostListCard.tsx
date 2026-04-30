import type { BoardCard } from "@/types/notice"
import Link from "next/link"

interface PostCardList {
  data: BoardCard
  listNumber?: number    
  isImportant?: boolean
}

export default function PostListCard({ data, listNumber, isImportant }: PostCardList) {

  const formattedDate = data.created_at.split('T')[0]
  const important = isImportant ?? data.important

  return (
    <li className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <Link 
        href={`/notice/${data.id}`}  
        className='flex items-center w-full py-4' 
        aria-label={`공지사항: ${data.title}`}
      >
        <div className="flex gap-1 items-center justify-start w-1/2">
          {important ? (
            <strong className="text-white px-2 py-1 bg-orange-600 text-xs rounded-sm font-normal" aria-label="중요 공지">
              필독
            </strong>
          ) : ''}
          <p className="truncate">{data.title}</p>
        </div>

        <div className="w-1/4 text-center shrink-0">
          <span className="sr-only">작성자</span>
          <p className="truncate">{data.users.nickname}</p>
        </div>

        <div className="w-1/4 text-center shrink-0 text-gray-500">
          <span className="sr-only">작성일</span>
          {formattedDate}
        </div>
      </Link>
    </li>
  )
}