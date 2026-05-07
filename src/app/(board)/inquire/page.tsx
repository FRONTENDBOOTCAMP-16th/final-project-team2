import PostListCard from '@/app/components/board/PostListCard';
import Pagination from '@/app/components/board/Pagination';
import { getInquires } from '@/api/inpuire';

export default async function qnaList({
  searchParams,
}: {  
  searchParams: Promise<{ page?: string }>; 
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const { normalData, normalCount } = await getInquires(currentPage);

  if (normalData.length === 0) {
    return <div>등록된 QNA가 없습니다.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">1:1 문의</h1>
      
      <ul>
        {normalData.map((inquire) => {
          return (
            <PostListCard 
              key={inquire.id} 
              data={inquire} 
              isImportant={false}
              link="inquire"
              isAnswered={inquire.is_answered}
            />
          );
        })}
      </ul>

      <Pagination count={normalCount || 0} current={currentPage} link={'inquire'} />
    </div>
  );
}