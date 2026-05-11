'use client';

import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">상품을 불러오지 못했습니다</h2>

      <p className="mt-3 text-sm text-gray-500">일시적인 오류가 발생했습니다. 다시 시도해주세요.</p>

      {process.env.NODE_ENV === 'development' && (
        <p className="mt-4 max-w-xl rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-600">{error.message}</p>
      )}

      <Link href={'/'} className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white cursor-pointer hover:bg-gray-800 duration-150">
        메인페이지로 이동
      </Link>
    </div>
  );
}
