import { Reviews } from '@/app/lib/Reviews';
import { Star } from 'lucide-react';

type ReviewProps = {
  reviews: Reviews[];
};

const ReviewChart = ({ reviews }: ReviewProps) => {
  const review_avg = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.grade, 0) / reviews.length).toFixed(1) : '0.0';
  const reviewStats = {
    5: reviews.filter(r => r.grade === 5).length,
    4: reviews.filter(r => r.grade === 4).length,
    3: reviews.filter(r => r.grade === 3).length,
    2: reviews.filter(r => r.grade === 2).length,
    1: reviews.filter(r => r.grade === 1).length,
  };

  function reviewPercent(count: number, length: number) {
    if (length === 0) return 0;
    return (count / length) * 100;
  }
  const ratingRows = [
    { label: '5점', percent: reviewPercent(reviewStats['5'], reviews.length) },
    { label: '4점', percent: reviewPercent(reviewStats['4'], reviews.length) },
    { label: '3점', percent: reviewPercent(reviewStats['3'], reviews.length) },
    { label: '2점', percent: reviewPercent(reviewStats['2'], reviews.length) },
    { label: '1점', percent: reviewPercent(reviewStats['1'], reviews.length) },
  ];

  return (
    <article className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-semibold">고객 리뷰</h2>

      <div className="mt-6 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <p className="text-5xl font-bold">{review_avg}</p>

          <div className="mt-3 flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${index < Math.floor(Number(review_avg)) ? 'text-yellow-400' : 'text-gray-200'}`}
                fill={index < 5 ? 'currentColor' : 'none'}
              />
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">{reviews.length}개의 리뷰</p>
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
    </article>
  );
};

export default ReviewChart;
