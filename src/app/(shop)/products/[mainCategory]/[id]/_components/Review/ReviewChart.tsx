import { Reviews } from '@/app/lib/reviews.types'
import { Star } from 'lucide-react'

type ReviewProps = {
  reviews: Reviews[]
  average_grade: number | null
}

const ReviewChart = ({ reviews, average_grade }: ReviewProps) => {
  const averageGrade = average_grade ?? 0
  const totalReviews = reviews.length

  const reviewStats = reviews.reduce<Record<number, number>>(
    (acc, review) => {
      acc[review.grade] = (acc[review.grade] ?? 0) + 1
      return acc
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  )

  const reviewPercent = (count: number) => {
    if (totalReviews === 0) return 0
    return Number(((count / totalReviews) * 100).toFixed(0))
  }

  const ratingRows = [5, 4, 3, 2, 1].map((grade) => ({
    label: `${grade}점`,
    percent: reviewPercent(reviewStats[grade]),
  }))

  return (
    <article
      aria-labelledby="customerReviewChart"
      className="mx-auto max-w-7xl px-4 py-12"
    >
      <h2 id="customerReviewChart" className="text-2xl font-semibold">
        고객 리뷰 차트
      </h2>

      <div className="mt-6 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 pb-6 md:border-r md:border-b-0 md:pr-6 md:pb-0">
          <p className="text-5xl font-bold">{averageGrade.toFixed(1)}</p>

          <div
            className="mt-3 flex"
            aria-label={`평균 평점 ${averageGrade.toFixed(1)}점`}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index < Math.floor(averageGrade)

              return (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    isFilled ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  fill={isFilled ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
              )
            })}
          </div>

          <p className="mt-2 text-sm text-gray-500">{totalReviews}개의 리뷰</p>
        </div>

        <div className="space-y-3">
          {ratingRows.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-10 text-sm text-gray-600">{row.label}</span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${row.percent}%` }}
                />
              </div>

              <span className="w-10 text-right text-sm text-gray-500">
                {row.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ReviewChart
