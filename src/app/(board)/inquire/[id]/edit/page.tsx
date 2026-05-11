import WriteForm from '@/app/components/board/WriteForm';
import { getInquireDetail } from '@/api/inpuireDetail';
import { notFound } from 'next/navigation'
import { handleInquireAction } from '@/actions/inquireAction';

export default async function InquireEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const updateId = resolvedParams.id

  const inquire = await getInquireDetail(updateId)

  if (!inquire) {
    notFound()
  }

  const initialData = {
    id: updateId,
    title: inquire.title,
    content: inquire.question_content || '',
    important: false
  }

  return (
    <div className="container mx-auto py-10">
      <WriteForm
        board={'1:1문의'}
        initialData={initialData}
        action={handleInquireAction}
        showImportantCheckbox={false}
        link={`inquire/${updateId}`}
      />
    </div>
  );
}