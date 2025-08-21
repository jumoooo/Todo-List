import { useCallback, useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';

import style from './index.module.css';

import SearchInput from '@/components/SearchInput';
import Button from '@/components/Button';
import ItemList from '@/components/ItemList';

import fetchGetItems from '@/lib/fecth-get-items';
import fecthCreateItem from '@/lib/fecth-create-item';

export const getServerSideProps = async () => {
  // 최초 SSR 에서 목록 받아오기
  const [todoData] = await Promise.all([fetchGetItems()]);
  return {
    props: { todoData },
  };
};

export default function Home({ todoData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 초기 데이터
  const [todoDataList, setTodoData] = useState(todoData);
  const [newName, setNewName] = useState('');
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // UI 보조 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 생성 중
  const [isRefreshing, setIsRefreshing] = useState(false); // 목록 재조회 중

  // 반응형 padding 계산 부분
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    // 'resize' 때 핸들러 추가
    window.addEventListener('resize', handleResize);
    // unmoute 때 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let padding = '24px';
  if (windowWidth <= 375) {
    padding = '16px';
  } else if (windowWidth <= 744) {
    padding = '24px';
  }

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
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const success = await fecthCreateItem(newName);
      if (!success) {
        console.log('입력 실패 : ', success, ' ', newName);
      }
      console.log('입력 성공 : ', success, ' ', newName);
      // 초기화
      setNewName('');
      await refetchList();
    } finally {
      setIsSubmitting(false);
    }
  }, [newName, isSubmitting, refetchList]);

  return (
    <div className={style.Home} style={{ padding }}>
      <section className={style.section_search}>
        <SearchInput value={newName} onChange={onChange} onKeyDown={createNewName} />
        <Button
          onClick={createNewName}
          text={'추가하기'}
          child={<img src="/images/icons/plus_bl_icon_sm.png" width={16} height={16} />}
        />
      </section>

      <section className={style.section_list}>
        <div className={style.list_wrapper}>
          <ItemList listData={todoDataList} isDone={false} isRefreshing={isRefreshing} />
        </div>
        <div className={style.list_wrapper}>
          <ItemList listData={todoDataList} isRefreshing={isRefreshing} />
        </div>
      </section>
    </div>
  );
}
