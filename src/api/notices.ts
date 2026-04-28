import { createClient } from '../../utils/supabase/client'
import type { BoardCard } from '@/types/notice';

// 반환 타입을 중요 공지와 일반 공지로 분리하여 정의합니다.
export interface NoticeResponse {
  importantData: BoardCard[];
  normalData: BoardCard[];
  normalCount: number;
}

export const getNotices = async (pages: number): Promise<NoticeResponse> => {
  const ITEMS_PER_PAGE = 20;
  const supabase = createClient();

  const from = (pages - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Promise.all을 사용해 중요 공지와 일반 공지를 동시에 병렬로 가져옵니다.
  const [importantResult, normalResult] = await Promise.all([
    // 1. 중요 공지사항 모두 가져오기 (페이지네이션 없음)
    supabase
      .from('notices')
      .select('*, users (nickname)')
      .eq('important', true)
      .order('created_at', { ascending: false }),

    // 2. 일반 공지사항만 페이지네이션 적용해서 가져오기
    supabase
      .from('notices')
      .select('*, users (nickname)', { count: 'exact' })
      .eq('important', false)
      .order('created_at', { ascending: false })
      .range(from, to)
  ]);

  if (importantResult.error) throw new Error(importantResult.error.message);
  if (normalResult.error) throw new Error(normalResult.error.message);

  return {
    importantData: (importantResult.data as unknown as BoardCard[]) || [],
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalResult.count || 0
  };
};