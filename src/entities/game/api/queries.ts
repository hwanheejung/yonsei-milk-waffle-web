import type { ReadGameStatusResponseDto } from '@/shared/api/dto';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { gameApi } from './instance';

export const HELLO_QUERY_KEY = {
  GET_HELLO: () => ['game', 'status'],
};

const queries = {
  getGameStatus: () => ({
    queryKey: HELLO_QUERY_KEY.GET_HELLO(),
    queryFn: () => gameApi.getGameStatus(),
  }),
};

export { queries as helloQueries };

// ------------------ Query ---------------------

export const useGetGameStatus = <TData = ReadGameStatusResponseDto>(
  options?: Omit<
    UseQueryOptions<ReadGameStatusResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getGameStatus(),
    ...options,
  });
};
