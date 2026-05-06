// 실제 Next.js 프로젝트에서는 아래 import 문들을 주석 해제해서 사용하세요!
import { getNoticeDetail } from "@/api/noticeDetail";
import { notFound } from "next/navigation";
import DOMPurify from 'isomorphic-dompurify';


export default async function NoticeDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let notice;

  try {
    notice = await getNoticeDetail(id);
  } catch (err) {
    console.error(err);
    throw new Error("데이터를 불러오지 못했습니다."); 
  }

  if (!notice) {
    notFound(); 
  }

  const cleanHtml = DOMPurify.sanitize(notice.content);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{notice.title}</h1>
      <p className="text-gray-500">
        작성일: {new Date(notice.created_at).toLocaleDateString()}
      </p>
      <hr className="my-4" />
      <div 
        className="prose"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
}