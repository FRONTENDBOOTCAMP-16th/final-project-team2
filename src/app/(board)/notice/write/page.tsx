import WriteForm from '@/app/components/board/WriteForm';
import { createNotice } from '@/api/noticeWrite';

export default function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10">
      <WriteForm 
        board={'공지사항'}
        action={createNotice} 
        showImportantCheckbox={true} 
      />
    </div>
  );
}