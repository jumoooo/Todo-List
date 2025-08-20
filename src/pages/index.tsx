import { useEffect, useState } from 'react';
import style from './index.module.css';

import SearchInput from '@/components/SearchInput';
import AddButton from '@/components/AddButton';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // 초기값 입력
    handleResize();
    // 'resize' 때 핸들러 추가
    window.addEventListener('resize', handleResize);

    // unmoute 때 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let padding = '24px';
  if (windowWidth <= 375) {
    padding = '16px';
  } else if (windowWidth <= 744) {
    padding = '24px';
  }
  return (
    <div className={style.Home} style={{ padding }}>
      <section className={style.section_search}>
        <SearchInput />
        <AddButton
          text={'추가하기'}
          child={<img src="/images/Variant2.png" width={16} height={16} />}
        />
      </section>

      <section className="section_list"></section>
    </div>
  );
}
