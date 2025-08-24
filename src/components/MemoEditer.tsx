import style from './MemoEditer.module.css';

import React, { useRef } from 'react';

interface MemoEditerProps {
  title?: string;
  value?: string;
  placeholder?: string;
  onChangeInput: (value: string) => void;
}

const MemoEditer: React.FC<MemoEditerProps> = ({
  title = 'Memo',
  value,
  placeholder = '메모를 입력하세요',
  onChangeInput,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <div className={style.memoEditer}>
      <h2 className={style.memoEditer__title}>{title}</h2>
      <div className={style.memoEditer__body} onClick={() => textareaRef.current?.focus()}>
        <textarea
          className={style.memoEditer__textarea}
          ref={textareaRef}
          onInput={handleInput}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder={placeholder}
          value={value || ''}
        />
      </div>
    </div>
  );
};

export default React.memo(MemoEditer);
