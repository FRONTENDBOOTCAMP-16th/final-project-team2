import { getInquireDetail } from '@/actions/inquireAction'
import { notFound } from 'next/navigation'
import { getAuthUserInfo } from '@/actions/getUser'
import { sanitizeContent } from '@/utils/sanitize'
import Link from 'next/link'
import Image from 'next/image'
import InquireDeleteAction from '@/app/components/board/InquireDeleteAction'
import UnauthorizedModal from '@/app/components/board/UnauthorizedModal'
import LoginRequiredModal from '@/app/components/board/LoginRequiredModal'

export default async function QnaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // 원본 불러오기
  let qna
  try {
    qna = await getInquireDetail(id)
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === '이 게시글을 열람할 권한이 없습니다.') {
        return <UnauthorizedModal />
      }
      if (err.message === '로그인이 필요합니다.') {
        return <LoginRequiredModal />
      }
    }
    console.error(err)
    throw new Error('데이터를 불러오지 못했습니다.')
  }
  if (!qna) {
    notFound()
  }

  const cleanQuestion = sanitizeContent(qna.question_content || '')
  const cleanAnswer = sanitizeContent(qna.answer_content || '')

  const user = await getAuthUserInfo()

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-8">
      <section className="lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                Q. 질문
              </span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{qna.title}</h1>
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
              className="object-cover"
            />
          </div>
          <p className="text-sm">{qna.product?.name}</p>
        </div>

        <div
          className="prose max-w-none text-gray-800 dark:text-gray-200 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: cleanQuestion }}
        />
      </section>

      {/* 질문 작성 버튼 영역 */}
      {(user?.role === 'ADMIN' || qna?.product?.store_id === user?.id) && (
        <div className="flex justify-end gap-2">
          {user?.role === 'ADMIN' && (
            <InquireDeleteAction id={qna.id} />
          )}
          <Link
            href={`/inquire/${id}/reply`}
            className="inline-block bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            답변하기
          </Link>
        </div>
      )}

      <section
        className={`lg border p-6 shadow-sm ${qna.is_answered ? 'border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950' : 'border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'}`}
      >
        {qna.is_answered ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-block bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                A. 답변 완료
              </span>
              {qna.answered_at && (
                <span className="text-sm text-gray-500">
                  답변일: {new Date(qna.answered_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <hr className="my-4 border-blue-200" />
            <div
              className="prose max-w-none text-gray-800 dark:text-gray-200 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: cleanAnswer }}
            />
          </>
        ) : (
          <div className="py-10 text-center text-gray-500">
            <svg
              className="mx-auto mb-3 h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium text-gray-600">
              판매자가 답변을 준비 중입니다.
            </p>
            <p className="mt-1 text-sm">
              조금만 기다려주시면 빠르고 정확한 답변을 드리겠습니다.
            </p>
          </div>
        )}
      </section>

      {/* 수정 및 목록 버튼 */}
      <div className="flex justify-end gap-2">
        {(user?.role === 'ADMIN' || qna?.writer_id === user?.id) && (
          <div className='flex gap-2'>
            <InquireDeleteAction id={qna.id} />
            <Link
              href={`/inquire/${id}/edit`}
              className="inline-block bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
            >
              수정
            </Link>
          </div>
        )}

        <Link
          href="/inquire"
          prefetch={true}
          className="inline-block bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
        >
          목록
        </Link>
      </div>
    </div>
  )
}
