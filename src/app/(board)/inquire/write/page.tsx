// app/inquire/write/page.tsx
import WriteForm from '@/app/components/board/WriteForm'
import { handleInquireAction } from '@/actions/inquireAction'
import InquireFindProdctAction from '@/app/components/board/InquireFindProdctAction'

export default function NoticeWritePage() {
  return (
    <div className="container mx-auto py-10 max-w-6xl flex flex-col gap-6">
      <InquireFindProdctAction />

      <WriteForm
        type="inquire"
        board={'1:1문의'}
        action={handleInquireAction}
        showImportantCheckbox={false}
        link="inquire"
      />
    </div>
  )
}
