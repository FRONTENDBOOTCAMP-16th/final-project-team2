
export default function PostListSkeleton() {
  const SKELETON_COUNT = 10

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* 1. 페이지 타이틀 스켈레톤 */}
      <div className="h-8 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      
      {/* 2. 리스트 스켈레톤 */}
      <ul>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li 
            key={index} 
            className="border-b border-gray-100 py-4 flex items-center w-full animate-pulse"
          >
            {/* 제목 영역 (w-1/2) */}
            <div className="flex items-center justify-start w-1/2 pr-4">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* 작성자 영역 (w-1/4) */}
            <div className="w-1/4 flex justify-center shrink-0">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>

            {/* 날짜 영역 (w-1/4) */}
            <div className="w-1/4 flex justify-center shrink-0">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          </li>
        ))}
      </ul>

      {/* 3. 페이지네이션 스켈레톤 */}
      <div className="flex justify-center mt-8">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>
    </div>
  )
}