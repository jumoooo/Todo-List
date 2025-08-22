import { fetchUpdateItem } from '@/lib/fetch-crud-item';
import { TodoListUpdateData } from '@/types';
import { useCallback, useState } from 'react';

// 변경 후 리프레쉬
export function useUpdateTodo(refetchList: () => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTodo = useCallback(
    async (id: number, item: TodoListUpdateData) => {
      if (id === null) return;
      setIsLoading(true);
      setError(null);

      try {
        const success = await fetchUpdateItem(id, item);
        if (!success) {
          console.log('변경 실패 : ', success);
          throw new Error('변경 실패');
        }
        console.log('변경 성공 : ', success);
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
