import { getNoticeDetail } from "@/actions/noticeAction"
import { notFound } from "next/navigation"
import DOMPurify from 'isomorphic-dompurify'
import Link from "next/link"
import checkUserID from "@/actions/checkUserId"
import NoticeDeleteAction from "@/app/components/board/NoticeDeleteAction"


export default async function NoticeDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {

  let notice
  const { id } = await params

  try {
    notice = await getNoticeDetail(id)
  } catch (err) {
    console.error(err)
    throw new Error("데이터를 불러오지 못했습니다.")
  }

  if (!notice) {
    notFound()
  }

  const cleanHtml = DOMPurify.sanitize(notice.content || '')
  let isWriter = false
  const user = await checkUserID()
  if (notice.writer_id === user?.id || user?.role === 'ADMIN') {
    isWriter = true
  }

  return (
    <div className="w-full max-w-4xl p-8 mx-auto">
      <h1 className="text-2xl font-bold">{notice.title}</h1>
      <p className="text-gray-500">
        작성일: {new Date(notice.created_at).toLocaleDateString()}
      </p>
      <hr className="my-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
      <div className="flex gap-2 justify-end w-full my-6">
        {isWriter && (
          <Link
            href={`/notice/${notice.id}/edit`}
            className="flex items-center justify-center px-8 py-2 bg-gray-200 text-black"
          >
            수정
          </Link>
        )}
        {isWriter && (
          <NoticeDeleteAction id={notice.id} />
        )}
        <Link
          href="/notice"
          className="flex items-center justify-center px-8 py-2 bg-slate-800 text-white  hover:bg-slate-700"
        >
          목록
        </Link>
      </div>

    </div>
  )
}