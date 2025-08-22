import { createContext, useCallback, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { TodoDispatchContextType, TodoListUpdateData } from '@/types';

import style from './index.module.css';

import SearchInput from '@/components/SearchInput';
import Button from '@/components/Button';
import ItemList from '@/components/ItemList';

import { fetchCreateItems, fetchGetItems, fetchUpdateItem } from '@/lib/fetch-crud-item';
import Head from 'next/head';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { useRefetchLoading } from '@/hooks/useRefetchLoading';

export const getServerSideProps = async () => {
  // 최초 SSR 에서 목록 받아오기
  const [todoData] = await Promise.all([fetchGetItems()]);
  console.log(todoData);
  return {
    props: { todoData },
  };
};

export const TodoDispatchContext = createContext<TodoDispatchContextType | null>(null);

export default function Home({ todoData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 초기 데이터
  const [todoDataList, setTodoData] = useState(todoData);
  const [newName, setNewName] = useState('');

  // input 에 따른 name 변화
  const onChange = (value: string) => {
    setNewName(value);
  };

  // 할 일 목록 재조회
  const refetchList = useCallback(async () => {
    try {
      const fresh = await fetchGetItems();
      setTodoData(fresh);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, []);

  // 할 일 생성
  const createNewName = useCallback(async () => {
    if (!newName.trim()) return;
    try {
      const success = await fetchCreateItems(newName);
      if (!success) {
        console.log('입력 실패 : ', success, ' ', newName);
        return;
      }
      console.log('입력 성공 : ', success, ' ', newName);
      setNewName('');
      await refetchList();
    } finally {
    }
  }, [newName, refetchList]);

  const { fetching: updateTodo, isLoading } = useRefetchLoading(refetchList, fetchUpdateItem);

  return (
    <div className={style.Home}>
      <Head>
        <title>할 일 목록 페이지</title>
      </Head>
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
            <ItemList listData={todoDataList} isDone={false} isRefreshing={isLoading} />
          </div>
          <div className={style.list_wrapper}>
            <ItemList listData={todoDataList} isRefreshing={isLoading} />
          </div>
        </section>
      </TodoDispatchContext.Provider>
    </div>
  );
}
