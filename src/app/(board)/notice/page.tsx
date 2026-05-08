import PostListCard from '@/app/components/board/PostListCard';
import Pagination from '@/app/components/board/Pagination';
import { getNotices } from '@/api/notices';
import { createClient } from '../../../../utils/supabase/server'; 
import Link from 'next/link';

export default async function NoticeList({
  searchParams,
}: {  
  searchParams: Promise<{ page?: string }>; 
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isAdmin = false;
  if (user) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    if (!error && userData?.role === 'ADMIN') {
      isAdmin = true;
    }
  }
  
  const { importantData, normalData, normalCount } = await getNotices(currentPage);

  if (importantData.length === 0 && normalData.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        {isAdmin && (
          <div className="mb-4 text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">공지사항 작성 (관리자)</button>
          </div>
        )}
        <div>등록된 공지사항이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">공지사항</h1>
      </div>
      
      <ul>
        {importantData.map((notice) => (
          <PostListCard 
            key={`important-${notice.id}`}
            data={notice}
            isImportant={true}
            link={'notice'}
          />
        ))}

        {normalData.map((notice) => {
          return (
            <PostListCard 
              key={notice.id} 
              data={notice} 
              isImportant={false}
              link={'notice'}
            />
          );
        })}
      </ul>

      <div className="flex justify-end">
        {isAdmin && (
          <Link href={'/notice/write'} className="bg-gray-100 text-black px-4 py-2">
            글쓰기
          </Link>
        )}
      </div>

      <Pagination count={normalCount || 0} current={currentPage} link={'notice'}/>
    </div>
  );
}