import { TodoListData, TodoListUpdateData } from '@/types';

const tenantId = 'kjm';
/**
 * Todo 조회
 * @param name 사용자가 입력한 할 일 제목
 * @returns 성공 여부 (true/false) fetchGetItems
 */
export async function fetchGetItems(): Promise<TodoListData[]> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [] as TodoListData[];
  }
}

/**
 * Todo 상세 조회
 * @param itemId 할 일 ID
 * @returns TodoListData 할 일 상세
 */
export async function fetchGetIdItem(itemId: number): Promise<TodoListData | null> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * 새 Todo 생성
 * @param name 사용자가 입력한 할 일 제목
 * @returns 성공 여부 (true/false) fetchGetItems
 */
export async function fetchCreateItems(name: string): Promise<Boolean> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    if (!response.ok) {
      throw new Error();
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Todo 변경
 * @param itemId 할 일 id
 * @param todoData 할 일 변경할 내용
 * @returns 성공 여부 (true/false)
 */
export async function fetchUpdateItem(
  itemId: number,
  todoData: TodoListUpdateData,
): Promise<Boolean> {
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
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
