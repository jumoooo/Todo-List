import style from './TitleList.module.css';

import { TodoListData } from '@/types';
import React, { useMemo } from 'react';

import Item from './Item';

interface ButtonProps {
  listData: Array<TodoListData>;
  isDone?: Boolean;
  isRefreshing: Boolean;
}

const TitleList: React.FC<ButtonProps> = ({ listData, isDone = true, isRefreshing }) => {
  const non_src = useMemo(
    () => (isDone ? '/images/icons/done_icon_lg.svg' : '/images/icons/todo_icon_lg.svg'),
    [isDone],
  );
  const title_src = useMemo(() => (isDone ? '/images/done.svg' : '/images/todo.svg'), [isDone]);

  return (
    <div className={style.TitleList}>
      <div className={style.todo_list}>
        <img className={style.title} src={title_src} />
        <div className={style.list}>
          {isRefreshing ? (
            <div className={style.non_data}>
              <p>{'목록 갱신 중...'}</p>
            </div>
          ) : !listData || listData.length <= 0 ? (
            <div className={style.non_data}>
              <img src={non_src} />
              <p>{'할일이 없어요.'}</p>
              <p>{'TODO를 새롭게 추가해주세요!'}</p>
            </div>
          ) : (
            listData.map((item) => <Item key={item?.id} {...item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TitleList);
