import { adminApi } from '@/shared/api';
import type { AdminGameResultResponseDto } from '@/shared/api/dto';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetGameResult = () => {
  return useQuery({
    queryKey: ['gameResult'],
    queryFn: () => adminApi.getGameResult(),
  });
};

export const useGetGameResultSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: ['gameResult'],
    queryFn: () => adminApi.getGameResult(),
  });
};
