import type { AdminGameResponseDto } from '@/shared/api/dto';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { adminApi } from './instance';

export const ADMIN_QUERY_KEY = {
  GET_GAME: () => ['admin', 'game'],
};

const queries = {
  getGame: () => ({
    queryKey: ADMIN_QUERY_KEY.GET_GAME(),
    queryFn: () => adminApi.getGame(),
  }),
};

export { queries as adminQueries };

// ------------------ Query ---------------------

export const useGetGameQuery = <TData = AdminGameResponseDto>(
  options?: Omit<UseQueryOptions<AdminGameResponseDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getGame(),
    ...options,
  });
};
