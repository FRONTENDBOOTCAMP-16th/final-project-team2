import WriteForm from '@/app/components/board/WriteForm';
import { handleNoticeAction } from '@/actions/noticeAction';

export default async function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10">
      <WriteForm
        board={'1:1문의'}
        action={handleNoticeAction}
        showImportantCheckbox={true}
      />
    </div>
  );
}