import { useState } from 'react';
import style from './SearchInput.module.css';
import SearchBox from './SearchBox';

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter!');
    }
  };
  return (
    <div className={style.search_wrapper}>
      <SearchBox width={'100%'} />
      <div className={style.input_wrapper}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="할 일을 입력해주세요"
        />
      </div>
    </div>
  );
}
