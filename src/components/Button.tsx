import style from './Button.module.css';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import SearchBoxSvg from './SearchBoxSvg';

interface ButtonProps {
  width?: number;
  height?: number;
  child?: ReactNode;
  text?: string;
  color?: string;
  textColor?: string;
  holdSize?: Boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  width = 168,
  height = 56,
  child,
  text,
  color = 'var(--color-salte-200)',
  textColor,
  holdSize = false,
  onClick,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnSize, setBtnSize] = useState({ w: width, h: height }); // 기본값

  useEffect(() => {
    if (!btnRef.current) return;

    const updateSize = () => {
      const width = btnRef.current?.offsetWidth ?? 168;
      const height = btnRef.current?.offsetHeight ?? 56;
      setBtnSize({ w: width, h: height });
    };

    // 초기 사이즈
    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(btnRef.current);

    // 언마운트 시 해제
    return () => observer.disconnect();
  }, []);
  return (
    <button
      onClick={onClick}
      className={style.btn}
      ref={btnRef}
      style={holdSize ? { width: width, height: height } : {}}
    >
      <SearchBoxSvg
        backgroundColor={color}
        width={btnSize.w}
        height={btnSize.h}
        containRef={btnRef}
      />
      <div className={style.text}>
        {child}
        <p style={holdSize ? { color: textColor, display: 'flex' } : { color: textColor }}>
          {text}
        </p>
      </div>
    </button>
  );
};

export default React.memo(Button);
