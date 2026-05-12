import PostListCard from '@/app/components/board/PostListCard'
import Pagination from '@/app/components/board/Pagination'
import { getNotices } from '@/actions/noticeAction'
import { getAuthUserInfo } from '@/actions/getUser'
import Link from 'next/link'

export default async function NoticeList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params?.page) || 1
  const { importantData, normalData, normalCount } =
    await getNotices(currentPage)
  const auth = await getAuthUserInfo()
  const isAdmin = auth?.role === 'ADMIN'

  if (importantData.length === 0 && normalData.length === 0) {
    return (
      <div className="mx-auto w-full max-w-4xl p-4">
        {isAdmin && (
          <div className="mb-4 text-right">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              공지사항 작성 (관리자)
            </button>
          </div>
        )}
        <div>등록된 공지사항이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">공지사항</h1>
      </div>

      <ul>
        {importantData.map((notice) => (
          <PostListCard
            key={`important-${notice.id}`}
            data={notice}
            isImportant={true}
            link={'notice'}
          />
        ))}

        {normalData.map((notice) => {
          return (
            <PostListCard
              key={notice.id}
              data={notice}
              isImportant={false}
              link={'notice'}
            />
          )
        })}
      </ul>

      <div className="flex justify-end">
        {isAdmin && (
          <Link
            href={'/notice/write'}
            className="bg-gray-100 px-4 py-2 text-black"
          >
            글쓰기
          </Link>
        )}
      </div>

      <Pagination
        count={normalCount || 0}
        current={currentPage}
        link={'notice'}
      />
    </div>
  )
}
