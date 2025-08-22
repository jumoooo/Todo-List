import { fetchUpdateItem } from '@/lib/fetch-crud-item';
import { TodoListUpdateData } from '@/types';
import { useCallback, useState } from 'react';

// 변경 후 리프레쉬 Hook
export function useUpdateTodo(refetchList: () => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTodo = useCallback(
    async (itemId: number, item?: TodoListUpdateData) => {
      if (itemId === null) return;
      setIsLoading(true);
      setError(null);

      try {
        const success = await fetchUpdateItem(itemId, item);
        if (!success) {
          window.alert('변경 실패하였습니다.');
          throw new Error('변경 실패');
        }
        await refetchList();
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    },
    [refetchList],
  );
  return { updateTodo, isLoading, error };
}
