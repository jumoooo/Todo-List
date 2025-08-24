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
    <div className={style.titleList}>
      <div className={style.titleList__container}>
        <img className={style.titleList__title} src={title_src} />
        <div className={style.titleList__items}>
          {isRefreshing ? (
            <div className={style.titleList__empty}>
              <p>{'목록 갱신 중...'}</p>
            </div>
          ) : !listData || listData.length <= 0 ? (
            <div className={style.titleList__empty}>
              <img className={style.titleList__empty_img} src={non_src} />
              <p className={style.titleList__text}>{'할일이 없어요.'}</p>
              <p className={style.titleList__text}>{'TODO를 새롭게 추가해주세요!'}</p>
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
