import WriteForm from '@/app/components/board/WriteForm';
import { getNoticeDetail } from '@/api/noticeDetail'; // 기존에 사용하시던 함수 경로에 맞게 수정
import { createNotice } from '@/api/noticeWrite'; // 서버 액션 임포트 추가
import { notFound } from 'next/navigation';

export default async function NoticeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const updateId = resolvedParams.id;
  
  const notice = await getNoticeDetail(updateId);

  if (!notice) {
    notFound();
  }

  const initialData = {
    id: updateId,
    title: notice.title,
    content: notice.content || '',
    important: notice.important ?? false
  };

  return (
    <div className="container mx-auto py-10">
      <WriteForm 
        board="공지사항"
        initialData={initialData} 
        action={createNotice}
        showImportantCheckbox={true}
      />
    </div>
  );
}