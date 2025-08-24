import { useCallback, useState } from 'react';

/**
 * 공통 fetch 훅
 * @template T - fetch 함수 반환 타입
 * @template P - fetch 함수 파라미터 타입
 */
export function useFetchWithRefetch<T>(
  refetchList: () => Promise<void>,
  fetchs: (...args: any[]) => Promise<T>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetching = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchs(...args);

        if (typeof result === 'boolean' && result === false) {
          throw new Error('요청 실패');
        }

        await refetchList();
        // return result;
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchs, refetchList],
  );
  return { fetching, isLoading, error };
}
