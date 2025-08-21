import { TodoListData } from '@/types';

export default async function fetchGetItems(): Promise<TodoListData[]> {
  const tenantId = 'kjm';
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    console.log('test1');
    return await response.json();
  } catch (err) {
    console.error(err);
    return [] as TodoListData[];
  }
}
