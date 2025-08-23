import React, { useLayoutEffect, useRef, useState } from 'react';
import SearchBoxSvg from './SearchBoxSvg';

import style from './SearchInput.module.css';

interface SearchInputProps {
  placeholder?: string;
  disabled?: Boolean;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export default function SearchInput({
  placeholder = '할 일을 입력해주세요',
  disabled = false,
  value,
  onChange,
  onKeyDown,
}: SearchInputProps) {
  const [containerSize, setContainerSize] = useState({ w: 168, h: 56 }); // 기본값
  const containRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!containRef.current) return;
      const width = containRef.current.offsetWidth || containerSize.w;
      const height = containRef.current.offsetHeight || containerSize.h;
      setContainerSize({ w: width, h: height });
    };

    // 초기 실행
    updateSize();

    // 윈도우 리사이즈 시 실행
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div ref={containRef} className={style.search_wrapper}>
      <SearchBoxSvg width={'100%'} height={containerSize.h} containRef={containRef} />
      <div className={style.input_wrapper}>
        <input
          value={value}
          onKeyDown={(e) => {
            if (!disabled && e.key === 'Enter' && onKeyDown) onKeyDown(e);
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
