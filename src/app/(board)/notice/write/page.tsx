'use server'

import WriteForm from '@/app/components/board/WriteForm';
import { handleNoticeAction } from '@/actions/noticeAction';
import checkAdmin from '@/actions/checkAdminAction';

export default async function NoticeWritePage() {

  await checkAdmin('/notice');

  return (
    <div className="container mx-auto py-10">
      <WriteForm 
        board={'공지사항'}
        action={handleNoticeAction} 
        showImportantCheckbox={true} 
        link={'notice'}
      />
    </div>
  );
}