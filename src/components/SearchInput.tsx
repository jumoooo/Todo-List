import React, { useRef, useState } from 'react';
import SearchBox from './SearchBoxSvg';

import style from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: () => void;
}
export default function SearchInput({ value, onChange, onKeyDown }: SearchInputProps) {
  const containRef = useRef<HTMLDivElement>(null);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    }
  };
  return (
    <div ref={containRef} className={style.search_wrapper}>
      <SearchBox width={'100%'} height={56} containRef={containRef} />
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
