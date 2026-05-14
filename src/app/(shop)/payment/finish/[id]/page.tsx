import { PackageCheck } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <PackageCheck size={120} className="text-green-500 mb-4" />
      <h2 className="text-3xl font-bold dark:text-white">주문이 완료되었습니다!</h2>
      <p className="text-gray-500 dark:text-gray-400">주문해 주셔서 감사합니다. 빠르게 배송 준비하겠습니다.</p>

      <div className="w-full max-w-md mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <dl className="flex justify-between mb-3">
          <dt className="text-gray-500 dark:text-gray-400">주문번호</dt>
          <dd className="font-semibold text-gray-800 dark:text-gray-100">{id}</dd>
        </dl>
        <dl className="flex justify-between">
          <dt className="text-gray-500 dark:text-gray-400">주문일시</dt>
          <dd className="font-semibold text-gray-800 dark:text-gray-100">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</dd>
        </dl>
      </div>

      <div className="flex gap-4 mt-8">
        <Link href="/" className="px-8 py-3 bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors rounded-md font-bold">
          홈으로
        </Link>
        <Link href="/mypage" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-md font-bold">
          주문내역 보기
        </Link>
      </div>
    </div>
  )
}