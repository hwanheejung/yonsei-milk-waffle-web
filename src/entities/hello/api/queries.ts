import type { HelloResponseDto } from '@/shared/api/dto';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { helloApi } from './instance';

export const HELLO_QUERY_KEY = {
  GET_HELLO: () => ['hello'],
};

const queries = {
  getHello: () => ({
    queryKey: HELLO_QUERY_KEY.GET_HELLO(),
    queryFn: () => helloApi.getHello(),
  }),
};

export { queries as helloQueries };

// ------------------ Query ---------------------

export const useGetHelloQuery = <TData = HelloResponseDto>(
  options?: Omit<UseQueryOptions<HelloResponseDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getHello(),
    ...options,
  });
};
