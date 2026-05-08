// 실제 Next.js 프로젝트에서는 아래 import 문들을 주석 해제해서 사용하세요!
import { getInquireDetail } from "@/api/inpuireDetail";
import { notFound } from "next/navigation";
import sanitizeHtml from 'sanitize-html';
import Link from "next/link";
import Image from "next/image";

export default async function QnaDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let qna;

  try {
    qna = await getInquireDetail(id);
  } catch (err) {
    console.error(err);
    throw new Error("데이터를 불러오지 못했습니다."); 
  }

  if (!qna) {
    notFound(); 
  }

  console.log(qna)

  const sanitizeConfig = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'span', 'u', 's', 'br', 'hr', 'img', 'iframe', 'blockquote'],
    allowedAttributes: {
      '*': ['style', 'class'],
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'width', 'height'],
      'iframe': ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
    }
  };

  const cleanQuestion = sanitizeHtml(qna.question_content || '', sanitizeConfig);
  const cleanAnswer = sanitizeHtml(qna.answer_content || '', sanitizeConfig);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      
      {/* 1. 상단 레이아웃: 질문글 영역 */}
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

      {/* 2. 하단 레이아웃: 답변글 영역 */}
      <section className={`p-6 rounded-lg shadow-sm border ${qna.is_answered ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-200 border-dashed'}`}>
        {qna.is_answered ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded">
                A. 답변 완료
              </span>
              {qna.answered_at && (
                <span className="text-gray-500 text-sm">
                  답변일: {new Date(qna.answered_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <hr className="my-4 border-blue-200" />
            <div 
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: cleanAnswer }}
            />
          </>
        ) : (
          // 답변이 아직 없는 경우
          <div className="text-center py-10 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <p className="text-lg font-medium text-gray-600">판매자가 답변을 준비 중입니다.</p>
            <p className="text-sm mt-1">조금만 기다려주시면 빠르고 정확한 답변을 드리겠습니다.</p>
          </div>
        )}
      </section>
      <Link
        href="/inquire"
        className="inline-block mb-4 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
      >
        목록
      </Link>
    </div>
  );
}