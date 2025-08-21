/**
 * 새 Todo 생성
 * @param name 사용자가 입력한 할 일 제목
 * @returns 성공 여부 (true/false)
 */
export default async function fetchGetItems(name: string): Promise<Boolean> {
  const tenantId = 'kjm';
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
    // const data: TodoListData = await response.json();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
