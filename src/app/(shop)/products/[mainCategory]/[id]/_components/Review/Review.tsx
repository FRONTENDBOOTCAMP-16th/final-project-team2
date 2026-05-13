import { Reviews } from '@/app/lib/reviews'
import { Star } from 'lucide-react'
import { DateFormat } from '@/utils/intl'
import Image from 'next/image'

type ReviewListProps = {
  reviews: Reviews[]
}

export default function Review({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">리뷰</h2>
        <p className="mt-6 text-gray-500">아직 등록된 리뷰가 없습니다.</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <ul>
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="font-semibold">
                    {review.users.nickname}
                  </strong>

                  <time className="text-sm text-gray-400">
                    {DateFormat(review.created_at)}
                  </time>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const isFilled = index < review.grade

                      return (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill={isFilled ? 'currentColor' : 'none'}
                        />
                      )
                    })}

                    <span className="sr-only">평점 {review.grade}점</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{review.content}</p>

            {review.images?.length > 0 && (
              <div className="mt-5 flex gap-2 overflow-x-auto">
                {review.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={`리뷰 이미지 ${index + 1}`}
                    width={120}
                    height={120}
                    className="aspect-square rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
