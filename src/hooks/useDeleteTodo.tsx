import { fetchDeleteItem } from '@/lib/fetch-crud-item';
import { useCallback, useState } from 'react';

// 삭제 진행, 로딩 전달
export function useDeleteTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTodo = useCallback(async (itemId: number) => {
    if (itemId === null) return;
    setIsLoading(true);
    setError(null);

    try {
      const success = await fetchDeleteItem(itemId);
      if (!success) {
        console.log('삭제 실패 : ', success);
        throw new Error('변경 실패');
      }
      console.log('삭제 성공 : ', success);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { deleteTodo, isLoading, error };
}
