import WriteForm from '@/app/components/board/WriteForm';
import { getInquireDetail, handleInquireReplyAction } from "@/actions/inquireAction";
import { notFound } from "next/navigation";
import sanitizeHtml from 'sanitize-html'
import Image from "next/image";

export default async function ReplyInquirePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const replyId = resolvedParams.id

  const qna = await getInquireDetail(replyId)

  // 문의 내용을 알기 위해서 불러오고
  // sanitize로 처리하기
  const cleanQuestion = sanitizeHtml(qna.question_content || '', {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span', 'u', 's', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'style'],
      'iframe': ['src', 'width', 'height', 'allowfullscreen', 'frameborder'], 
    },
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data'],
  })


  if (!qna) {
    notFound()
  }

  const initialData = {
    id: replyId,
    reply_id: replyId,
    title: qna.title,
    content: qna.content || '',
    important: qna.important ?? false
  }

  return (
    <div className="container mx-auto py-10">

            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      
              <div className="mb-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                      Q. 질문
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900">{qna.title}</h1>
                  </div>
      
      
                  <p className="text-gray-500 text-sm mt-2 w-1/3 text-right">
                    작성일: {new Date(qna.created_at).toLocaleDateString()}
                  </p>
                </div>
      
              </div>
              <hr className="my-4" />
              <div className="w-full flex items-center gap-2 mb-4">
                <p className="sr-only">문의 상품</p>
              <div className="relative w-8 h-8 xl:w-12 xl:h-12 shrink-0">
                <Image 
                  src={qna.product?.thumbnail_image || ''}
                  alt={qna.product?.name || ''}
                  fill
                  className="object-cover rounded"
                />
              </div>              
                <p className="text-sm">{qna.product?.name}</p>
              </div>
      
              <div 
                className="prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: cleanQuestion }}
              />
            </section>

      <WriteForm 
        board={''}
        initialData={initialData}
        action={handleInquireReplyAction} 
        showImportantCheckbox={false} 
        link={`inquire/${replyId}`}
      />
    </div>
  );
}