import { ReactNode, useRef } from 'react';
import style from './Button.module.css';
import SearchBoxSvg from './SearchBoxSvg';

interface ButtonProps {
  child?: ReactNode;
  text: string;
  onClick: () => void;
}

export default function Button({ child, text, onClick }: ButtonProps) {
  const onBtnClick = () => {
    onClick();
  };
  const btnRef = useRef(null);
  return (
    <button onClick={onBtnClick} className={style.btn} ref={btnRef}>
      <SearchBoxSvg backgroundColor="#E2E8F0" width={168} height={56} containRef={btnRef} />
      <div className={style.text}>
        {child}
        {text}
      </div>
    </button>
  );
}
