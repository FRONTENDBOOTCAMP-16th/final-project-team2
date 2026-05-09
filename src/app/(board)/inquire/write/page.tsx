import WriteForm from '@/app/components/board/WriteForm';
import { handleInquireAction } from '@/actions/inquireAction';
import SearchProducts from '@/app/components/SearchProducts';

export default function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10">

      <SearchProducts/>

      <WriteForm 
        board={'1:1문의'}
        action={handleInquireAction} 
        showImportantCheckbox={false} 
        link='inquire'
      />
    </div>
  );
}