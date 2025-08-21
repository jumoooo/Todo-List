import { createContext, useCallback, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { TodoDispatchContextType, TodoListUpdateData } from '@/types';

import style from './index.module.css';

import SearchInput from '@/components/SearchInput';
import Button from '@/components/Button';
import ItemList from '@/components/ItemList';

import { fetchCreateItems, fetchGetItems, fetchUpdateItem } from '@/lib/fetch-crud-item';

export const getServerSideProps = async () => {
  // 최초 SSR 에서 목록 받아오기
  const [todoData] = await Promise.all([fetchGetItems()]);
  return {
    props: { todoData },
  };
};

export const TodoDispatchContext = createContext<TodoDispatchContextType | null>(null);

export default function Home({ todoData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 초기 데이터
  const [todoDataList, setTodoData] = useState(todoData);
  const [newName, setNewName] = useState('');

  // UI 보조 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 생성 중
  const [isRefreshing, setIsRefreshing] = useState(false); // 목록 재조회 중

  // input 에 따른 name 변화
  const onChange = (value: string) => {
    setNewName(value);
  };

  // 할 일 목록 재조회
  const refetchList = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const fresh = await fetchGetItems();
      setTodoData(fresh);
    } catch (err) {
      console.log(err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // 할 일 생성
  const createNewName = useCallback(async () => {
    if (!newName.trim()) return;
    try {
      const success = await fetchCreateItems(newName);
      if (!success) {
        console.log('입력 실패 : ', success, ' ', newName);
      }
      console.log('입력 성공 : ', success, ' ', newName);
      // 초기화
      setNewName('');
      await refetchList();
    } finally {
    }
  }, [newName, isSubmitting, refetchList]);

  // 변경
  const updateTodo = useCallback(
    async (id: number) => {
      if (!id) return;
      try {
        const updateData = todoDataList.find((item) => Number(item.id) === Number(id));
        if (!updateData) return;

        const updateItem: TodoListUpdateData = {
          name: updateData.name ?? '',
          memo: updateData.memo ?? '',
          imageUrl: updateData.imageUrl ?? '',
          isCompleted: !updateData.isCompleted,
        };

        const success = await fetchUpdateItem(id, updateItem);
        if (!success) {
          console.log('변경 실패 : ', success, ' ', newName);
        }
        console.log('변경 성공 : ', success, ' ', newName);
        await refetchList();
      } catch (err) {
        console.error(err);
      } finally {
      }
    },
    [todoDataList, refetchList],
  );

  return (
    <div className={style.Home}>
      <section className={style.section_search}>
        <SearchInput value={newName} onChange={onChange} onKeyDown={createNewName} />
        <Button
          onClick={createNewName}
          text={'추가하기'}
          child={<img src="/images/icons/plus_bl_icon_sm.png" width={16} height={16} />}
        />
      </section>
      <TodoDispatchContext.Provider value={{ updateTodo }}>
        <section className={style.section_list}>
          <div className={style.list_wrapper}>
            <ItemList listData={todoDataList} isDone={false} isRefreshing={isRefreshing} />
          </div>
          <div className={style.list_wrapper}>
            <ItemList listData={todoDataList} isRefreshing={isRefreshing} />
          </div>
        </section>
      </TodoDispatchContext.Provider>
    </div>
  );
}
