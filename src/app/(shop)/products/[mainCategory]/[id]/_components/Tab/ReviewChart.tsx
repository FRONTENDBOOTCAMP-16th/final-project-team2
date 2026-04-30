import Image from 'next/image';
import { Star } from 'lucide-react';

const Review = () => {
  const ratingRows = [
    { label: '5점', percent: 70 },
    { label: '4점', percent: 15 },
    { label: '3점', percent: 5 },
    { label: '2점', percent: 10 },
    { label: '1점', percent: 0 },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-semibold">고객 리뷰</h2>

      <div className="mt-6 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <p className="text-5xl font-bold">4.5</p>

          <div className="mt-3 flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={`h-5 w-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill={index < 4 ? 'currentColor' : 'none'} />
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">1,334개의 리뷰</p>
        </div>

        <div className="space-y-3">
          {ratingRows.map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-10 text-sm text-gray-600">{row.label}</span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-yellow-400" style={{ width: `${row.percent}%` }} />
              </div>

              <span className="w-10 text-right text-sm text-gray-500">{row.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <article className="rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <strong className="font-semibold">블랙펑크</strong>
                <span className="text-sm text-gray-400">2026.04.28</span>

                <div className=" flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                  <span className="sr-only">평점 5점</span>
                </div>
              </div>
            </div>

            <div className="space-x-2">
              <button type="button" className="cursor-pointer rounded-full  px-3 py-1 text-sm bg-red-500 text-white">
                삭제
              </button>
              <span className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-sm text-white">수정</span>
            </div>
          </div>

          <p className="mt-4  text-gray-700">필기감이 부드럽고 디자인도 깔끔해서 만족합니다. 포장도 꼼꼼했고, 선물용으로도 괜찮을 것 같아요.</p>

          <div className="mt-5 flex gap-2">
            <Image src="/pen_dummy.jpg" alt="리뷰 이미지 1" width={120} height={120} className="aspect-square rounded-lg object-cover" />
            <Image src="/pen_dummy.jpg" alt="리뷰 이미지 2" width={120} height={120} className="aspect-square rounded-lg object-cover" />
          </div>
        </article>
        <article className="rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <strong className="font-semibold">잠수탄 소년단</strong>
                <span className="text-sm text-gray-400">2026.04.28</span>

                <div className=" flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                  <span className="sr-only">평점 5점</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4  text-gray-700">필기감이 부드럽고 디자인도 깔끔해서 만족합니다. 포장도 꼼꼼했고, 선물용으로도 괜찮을 것 같아요.</p>

          <div className="mt-5 flex gap-2">
            <Image src="/pen_dummy.jpg" alt="리뷰 이미지 1" width={120} height={120} className="aspect-square rounded-lg object-cover" />
            <Image src="/pen_dummy.jpg" alt="리뷰 이미지 2" width={120} height={120} className="aspect-square rounded-lg object-cover" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Review;
