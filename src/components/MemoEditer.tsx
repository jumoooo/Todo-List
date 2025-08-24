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
    <div className={style.memo_wrapper}>
      <h2>{title}</h2>
      <div className={style.memo_text_wrapper} onClick={() => textareaRef.current?.focus()}>
        <textarea
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
