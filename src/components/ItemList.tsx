import style from './TitleList.module.css';
import { TodoListData } from '@/types';

import ListItem from './ListItem';

export default function TitleList({
  listData,
  isDone = true,
  isRefreshing,
}: {
  listData: Array<TodoListData>;
  isDone?: Boolean;
  isRefreshing: Boolean;
}) {
  //isDone : 해당 리스트가 Done 인가 아닌가
  let title_src = '/images/todo.svg';
  let non_src = '/images/icons/todo_icon_lg.svg';
  if (isDone) {
    title_src = '/images/done.svg';
    non_src = '/images/icons/done_icon_lg.svg';
  }
  const currentData = listData.filter((item) => item.isCompleted === isDone);
  return (
    <div className={style.TitleList}>
      <div className={style.todo_list}>
        <img className={style.title} src={title_src} />
        <div className={style.list}>
          {isRefreshing ? (
            <div className={style.non_data}>
              <p>{'목록 갱신 중...'}</p>
            </div>
          ) : !currentData || currentData.length <= 0 ? (
            <div className={style.non_data}>
              <img src={non_src} />
              <p>{'할일이 없어요.'}</p>
              <p>{'TODO를 새롭게 추가해주세요!'}</p>
            </div>
          ) : (
            currentData.map((item) => <ListItem key={item?.id} {...item} />)
          )}
        </div>
      </div>
    </div>
  );
}
