import WriteForm from '@/app/components/board/WriteForm';
import { createInquire } from '@/api/inpuireWrite';

export default function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10">
      <WriteForm 
        board={'1:1문의'}
        action={createInquire} 
        showImportantCheckbox={false} 
        link='inquire'
      />
    </div>
  );
}