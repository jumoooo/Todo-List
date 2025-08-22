import { useCallback, useState } from 'react';

/**
 * 공통 fetch 훅
 * @template T - fetch 함수 반환 타입
 * @template P - fetch 함수 파라미터 타입
 */
export function useRefetchLoading<T, P>(
  refetchList: () => Promise<void>,
  fetchs: (params: P) => Promise<T>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetching = useCallback(
    async (params: P) => {
      if (params === null) return;
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchs(params);

        if (typeof result === 'boolean' && result === false) {
          throw new Error('요청 실패');
        }

        await refetchList();
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
