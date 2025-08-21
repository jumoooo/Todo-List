import React, { useEffect, useRef, useState } from 'react';
import SearchBoxSvg from './SearchBoxSvg';

import style from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: () => void;
}
export default function SearchInput({ value, onChange, onKeyDown }: SearchInputProps) {
  const [btnSize, setBtnSize] = useState({ w: 168, h: 56 }); // 기본값
  const containRef = useRef<HTMLDivElement>(null);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  useEffect(() => {
    if (!containRef.current) return;

    const updateSize = () => {
      const width = containRef.current?.offsetWidth ?? 168;
      const height = containRef.current?.offsetHeight ?? 56;
      setBtnSize({ w: width, h: height });
    };

    // 초기 사이즈
    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(containRef.current);

    // 언마운트 시 해제
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containRef} className={style.search_wrapper}>
      <SearchBoxSvg width={'100%'} height={56} containRef={containRef} />
      <div className={style.input_wrapper}>
        <input
          value={value}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onKeyDown) onKeyDown();
          }}
          onChange={onChangeSearch}
          placeholder="할 일을 입력해주세요"
        />
      </div>
    </div>
  );
}
