import Link from 'next/link';
import style from './Logo.module.css';
import { useEffect, useState } from 'react';

export default function Logo() {
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

  let logoSrc = '/svg/logo_lg.svg';
  let paddingLeft = '24px';
  if (windowWidth <= 375) {
    logoSrc = '/svg/logo_sm.svg';
    paddingLeft = '16px';
  } else if (windowWidth <= 744) {
    paddingLeft = '24px';
  }
  return (
    <Link className={style.logo} href={'/'} style={{ paddingLeft }}>
      <img src={logoSrc} />
    </Link>
  );
}
