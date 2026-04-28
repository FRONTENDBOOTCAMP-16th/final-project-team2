'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // 컴포넌트가 리렌더링될 때마다 새로운 QueryClient가 생성되는 것을 방지하기 위해 useState를 사용합니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 기본 데이터 신선도 유지 시간 (예: 1분)
            refetchOnWindowFocus: false, // 탭 이동 후 돌아왔을 때 자동 재요청 방지 (선택 사항)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
