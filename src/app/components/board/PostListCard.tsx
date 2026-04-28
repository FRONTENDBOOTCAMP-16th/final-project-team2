import type { BoardCard } from "@/types/notice";
import Link from "next/link";

interface PostCardList {
  data: BoardCard;
  listNumber?: number;    // 부모로부터 받을 번호 (선택적 프로퍼티)
  isImportant?: boolean;  // 부모로부터 받을 중요 여부 (선택적 프로퍼티)
}

export default function PostListCard({ data, listNumber, isImportant }: PostCardList) {
  const formattedDate = data.created_at.split('T')[0];
  
  // prop으로 받은 isImportant를 우선시하되, 없으면 data.important 사용
  const important = isImportant ?? data.important;

  return (
    <li className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <Link 
        href={`/notice/${data.id}`}  
        className='flex items-center w-full py-4' 
        aria-label={`공지사항: ${data.title}`}
      >
        {/* 2. 제목 영역 (w-1/2 -> flex-1로 변경하여 남은 공간을 모두 차지하도록 함) */}
        <div className="flex gap-1 items-center justify-start w-1/2">

          {important ? (
            <strong className="text-white px-2 py-1 bg-orange-600 text-xs rounded-sm font-normal" aria-label="중요 공지">
              필독
            </strong>
          ) : ''}

          <p className="truncate">{data.title}</p>
        </div>

        {/* 3. 작성자 영역 */}
        <div className="w-1/4 text-center shrink-0">
          <span className="sr-only">작성자</span>
          <p className="truncate">{data.users.nickname}</p>
        </div>

        {/* 4. 작성일 영역 */}
        <div className="w-1/4 text-center shrink-0 text-gray-500">
          <span className="sr-only">작성일</span>
          {formattedDate}
        </div>
      </Link>
    </li>
  );
}