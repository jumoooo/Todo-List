import { ReactNode } from 'react';
import style from './AddButton.module.css';
import SearchBox from './SearchBox';

export default function AddButton({ child, text }: { child?: ReactNode; text: string }) {
  const onClick = () => {
    console.log('button Click!!');
  };
  return (
    <button onClick={onClick} className={style.addbtn}>
      <SearchBox backgroundColor="#E2E8F0" width={168} height={56} />
      <div className={style.text}>
        {child}
        {text}
      </div>
    </button>
  );
}
