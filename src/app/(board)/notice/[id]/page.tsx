import { getNoticeDetail } from "@/api/noticeDetail"
import { notFound } from "next/navigation"
import DOMPurify from 'isomorphic-dompurify'
import Link from "next/link"


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
      <Link
        href="/notice"
        className="inline-block mb-4 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
      >
        목록
      </Link>
    </div>
  )
}