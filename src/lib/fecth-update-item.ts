import { TodoListData } from '@/types';

/**
 * Todo 변경
 * @param itemId 할 일 id
 * @param todoData 할 일 변경할 내용
 * @returns 성공 여부 (true/false)
 */

export default async function fetchUpdateItem(
  itemId: number,
  todoData: TodoListData,
): Promise<Boolean> {
  const tenantId = 'kjm';
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error();
    }
    console.log('test1');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
