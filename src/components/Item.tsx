import React, { useContext } from 'react';
import { TodoDispatchContext } from '@/pages';
import Link from 'next/link';

import style from './Item.module.css';

interface ItemProps {
  id: number;
  isCompleted?: Boolean;
  name?: string;
  memo?: string;
  imageUrl: string;
}

const Item: React.FC<ItemProps> = ({ id, isCompleted = true, name = '', memo, imageUrl }) => {
  const todoCtx = useContext(TodoDispatchContext);
  return (
    <Link
      href={`/items/${id}`}
      className={style.Item}
      style={
        isCompleted
          ? { backgroundColor: 'var(--color-violet-100)' }
          : { backgroundColor: '#FFFFFF' }
      }
    >
      <img
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          todoCtx?.updateTodo(id);
        }}
        src={isCompleted ? '/images/icons/chk_ok_icon.svg' : '/images/icons/chk_no_icon.svg'}
      />
      <h1 className={style.text} style={isCompleted ? { textDecoration: 'line-through' } : {}}>
        {name}
      </h1>
    </Link>
  );
};

export default React.memo(Item);
