import PostListCard from '@/app/components/board/PostListCard';
import Pagination from '@/app/components/board/Pagination';
import { getNotices } from '@/api/notices';

export default async function NoticeList({
  searchParams,
}: {  
  searchParams: Promise<{ page?: string }>; 
}) {
  const params = await searchParams;
  
  const currentPage = Number(params?.page) || 1;
  const ITEMS_PER_PAGE = 20; // 번호 계산을 위해 동일한 상수 필요
  
  // 1. 수정된 API의 반환값에 맞게 구조 분해 할당
  const { importantData, normalData, normalCount } = await getNotices(currentPage);

  // 중요 공지와 일반 공지가 모두 없을 때 예외 처리
  if (importantData.length === 0 && normalData.length === 0) {
    return <div>등록된 공지사항이 없습니다.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      
      <ul>
        {/* 2. 중요 공지사항 렌더링 (번호 없음) */}
        {importantData.map((notice) => (
          <PostListCard 
            key={`important-${notice.id}`} 
            data={notice} 
            isImportant={true} // 자식 컴포넌트에서 배경색 등을 다르게 주도록 prop 전달 (선택사항)
          />
        ))}

        {/* 3. 일반 공지사항 렌더링 (역순 번호 계산해서 전달) */}
        {normalData.map((notice, index) => {
          // 역순 번호 계산 로직
          const listNumber = normalCount - ((currentPage - 1) * ITEMS_PER_PAGE) - index;
          
          return (
            <PostListCard 
              key={notice.id} 
              data={notice} 
              listNumber={listNumber} // 자식 컴포넌트에서 이 번호를 받아서 출력해야 합니다.
              isImportant={false}
            />
          );
        })}
      </ul>

      {/* 4. 페이지네이션은 일반 공지사항의 개수(normalCount)를 기준으로 렌더링합니다. */}
      <Pagination count={normalCount || 0} current={currentPage} />
    </div>
  );
}