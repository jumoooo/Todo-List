import Link from 'next/link';
import style from './Logo.module.css';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link className={style.logo} href={'/'}>
      <picture>
        <source media="(max-width: 375px)" srcSet="/images/logo_sm.svg" />
        <img src="/images/logo_lg.svg" alt="로고" />
      </picture>
    </Link>
  );
};
export default React.memo(Logo);
