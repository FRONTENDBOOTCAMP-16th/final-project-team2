import PostListCard from '@/app/components/board/PostListCard';
import Pagination from '@/app/components/board/Pagination';
import { getInquires } from '@/actions/inquireAction';
import { getAuthUserInfo } from '@/actions/getUser';
import Link from 'next/link';

export default async function qnaList({
  searchParams,
}: {  
  searchParams: Promise<{ page?: string }>; 
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const { normalData, normalCount } = await getInquires(currentPage);
  const user = await getAuthUserInfo()
  
  if (normalData.length === 0) {
    return <div>등록된 QNA가 없습니다.</div>;
  }

  console.log(user)

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">1:1 문의</h1>
      
      {normalData.length === 0 ? (
        <div className="py-20 text-center text-gray-500">등록된 QNA가 없습니다.</div>
      ) : (
        <ul>
          {normalData.map((inquire) => (
            <PostListCard 
              key={inquire.id}
              data={inquire} 
              isImportant={false}
              link="inquire"
              isAnswered={inquire.is_answered}
            />
          ))}
        </ul>
      )}
      
        {user && (
      <div className="flex justify-end">
          <Link href={'/inquire/write'} className="bg-gray-100 text-black px-4 py-2">
            글쓰기
          </Link>
      </div>
        )}


      <Pagination 
        count={normalCount} 
        current={currentPage} 
        link={'inquire'} 
      />
    </div>
  );
}