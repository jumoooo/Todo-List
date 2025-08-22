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
  todoData?: TodoListUpdateData,
): Promise<Boolean> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`;

  try {
    // 해당 todo 상세 조회
    const todoItemData = await fetchGetIdItem(itemId);
    if (!todoItemData) throw new Error('변경하려는 할 일이 데이터상 없습니다.');

    // 변수 todoData 없이 변경요청 시 isCompleted 만 변경
    if (!todoData) {
      todoData = {
        name: todoItemData.name || '',
        memo: todoItemData.memo || '',
        imageUrl: todoItemData.imageUrl || '',
        isCompleted: !todoItemData.isCompleted,
      };
    }

    // 변경 진행
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

/**
 * image upload 후 URL 반환
 * @param imageFile
 * @returns URL 반환 (string)
 */
export async function fetchUploadImage(imageFile: File): Promise<string> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/images/upload`;
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('이미지 업로드 실패');
    const data = await response.json();
    return data.url || '';
  } catch (err) {
    console.error(err);
    return '';
  }
}

/**
 * Todo 삭제
 * @param itemId 할 일 id
 * @returns 성공 여부 (true/false)
 */
export async function fetchDeleteItem(itemId: number): Promise<Boolean> {
  const url = `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('이미지 업로드 실패');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
