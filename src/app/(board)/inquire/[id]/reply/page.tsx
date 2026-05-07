import WriteForm from '@/app/components/board/WriteForm';
import { replyInquire } from '@/api/inpuireReply';

export default function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10">
      <WriteForm 
        board={'1:1답변'}
        action={replyInquire} 
        showImportantCheckbox={false} 
      />
    </div>
  );
}