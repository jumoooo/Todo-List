import style from './index.module.css';

import { createContext, useCallback, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { TodoDispatchContextType } from '@/types';

import SearchInput from '@/components/SearchInput';
import Button from '@/components/Button';
import ItemList from '@/components/ItemList';

import { fetchCreateItems, fetchGetItems, fetchUpdateItem } from '@/lib/todo_api';
import Head from 'next/head';
import { useFetchWithRefetch } from '@/hooks/useFetchWithRefetch';

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

  // 할 일 목록 재조회
  const refetchList = useCallback(async () => {
    try {
      const fresh = await fetchGetItems();
      setTodoData(fresh);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { fetching: createItem, isLoading: isCreateLoading } = useFetchWithRefetch(
    refetchList,
    fetchCreateItems,
  );
  const { fetching: updateTodo, isLoading } = useFetchWithRefetch(refetchList, fetchUpdateItem);

  // 할 일 생성
  const createNewName = useCallback(async () => {
    if (isCreateLoading || !newName.trim()) return;
    try {
      await createItem(newName);
      setNewName('');
    } catch (err) {
      window.alert('할 일 생성에 실패하였습니다.');
    }
  }, [newName, isCreateLoading]);

  const handleInputChange = useCallback((value: string) => {
    setNewName(value);
  }, []);

  const inputPlaceholder = useMemo(
    () => (isCreateLoading ? '할 일 생성중...' : '할 일을 입력해주세요'),
    [isCreateLoading],
  );
  const buttonPlaceholder = useMemo(
    () => (isCreateLoading ? '할 일 생성중...' : '추가하기'),
    [isCreateLoading],
  );

  const todoItems = useMemo(() => todoDataList.filter((item) => !item.isCompleted), [todoDataList]);
  const doneItems = useMemo(() => todoDataList.filter((item) => item.isCompleted), [todoDataList]);

  return (
    <div className={style.homePage}>
      <Head>
        <title>할 일 목록 페이지</title>
      </Head>
      <section className={style.homePage__section_search}>
        <SearchInput
          placeholder={inputPlaceholder}
          disabled={isCreateLoading}
          value={newName}
          onChange={handleInputChange}
          onKeyDown={createNewName}
        />
        <Button
          onClick={createNewName}
          text={buttonPlaceholder}
          child={<img src="/images/icons/plus_bl_icon_sm.png" width={16} height={16} />}
        />
      </section>
      <TodoDispatchContext.Provider value={{ updateTodo }}>
        <section className={style.homePage__section_list}>
          <div className={style.homePage__list_wrapper}>
            <ItemList listData={todoItems} isDone={false} isRefreshing={isLoading} />
          </div>
          <div className={style.homePage__list_wrapper}>
            <ItemList listData={doneItems} isRefreshing={isLoading} />
          </div>
        </section>
      </TodoDispatchContext.Provider>
    </div>
  );
}
