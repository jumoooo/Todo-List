import { ReactNode } from 'react';
import style from './global-layout.module.css';

import Logo from '../Logo';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.headerinner}>
          <Logo />
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
