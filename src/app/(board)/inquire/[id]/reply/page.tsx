import WriteForm from '@/app/components/board/WriteForm'
import {
  getInquireDetail,
  handleInquireReplyAction,
} from '@/actions/inquireAction'
import { notFound } from 'next/navigation'
import { sanitizeContent } from '@/utils/sanitize'
import Image from 'next/image'

export default async function ReplyInquirePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const replyId = resolvedParams.id

  const qna = await getInquireDetail(replyId)

  // 문의 내용을 알기 위해서 불러오고
  // sanitize로 처리하기
  const cleanQuestion = sanitizeContent(qna.question_content || '')

  if (!qna) {
    notFound()
  }

  const initialData = {
    id: replyId,
    reply_id: replyId,
    title: qna.title,
    content: qna.content || '',
    important: qna.important ?? false,
  }

  return (
    <div className="container mx-auto py-10">
      {/* 상단 질문 원본 */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                Q. 질문
              </span>
              <h1 className="text-2xl font-bold text-gray-900">{qna.title}</h1>
            </div>
            <p className="mt-2 w-1/3 text-right text-sm text-gray-500">
              작성일: {new Date(qna.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4 flex w-full items-center gap-2">
          <p className="sr-only">문의 상품</p>
          <div className="relative h-8 w-8 shrink-0 xl:h-12 xl:w-12">
            <Image
              src={qna.product?.thumbnail_image || ''}
              alt={qna.product?.name || ''}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="text-sm">{qna.product?.name}</p>
        </div>

        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: cleanQuestion }}
        />
      </section>

      {/* 작성폼 */}
      <WriteForm
        board={''}
        initialData={initialData}
        action={handleInquireReplyAction}
        showImportantCheckbox={false}
        link={`inquire/${replyId}`}
      />
    </div>
  )
}
