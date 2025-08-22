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
        window.alert('삭제 실패하였습니다.');
        throw new Error('삭제 실패');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { deleteTodo, isLoading, error };
}
