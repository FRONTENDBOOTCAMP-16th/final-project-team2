import { useQuery } from '@tanstack/react-query';
import { getNotices } from '@/api/notices';

export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
};

export const useNotices = () => {
  return useQuery({
    queryKey: noticeKeys.lists(),
    queryFn: getNotices,
  });
};
