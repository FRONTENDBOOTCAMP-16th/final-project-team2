export default function PostListSkeleton() {
  const SKELETON_COUNT = 10

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
      {/* 1. 페이지 타이틀 스켈레톤 */}
      <div className="mb-6 h-8 w-24 animate-pulse rounded bg-gray-200"></div>

      {/* 2. 리스트 스켈레톤 */}
      <ul>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li
            key={index}
            className="flex w-full animate-pulse items-center border-b border-gray-100 py-4"
          >
            {/* 제목 영역 (w-1/2) */}
            <div className="flex w-1/2 items-center justify-start pr-4">
              <div className="h-5 w-3/4 rounded bg-gray-200"></div>
            </div>

            {/* 작성자 영역 (w-1/4) */}
            <div className="flex w-1/4 shrink-0 justify-center">
              <div className="h-5 w-16 rounded bg-gray-200"></div>
            </div>

            {/* 날짜 영역 (w-1/4) */}
            <div className="flex w-1/4 shrink-0 justify-center">
              <div className="h-5 w-24 rounded bg-gray-200"></div>
            </div>
          </li>
        ))}
      </ul>

      {/* 3. 페이지네이션 스켈레톤 */}
      <div className="mt-8 flex justify-center">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  )
}
