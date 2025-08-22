import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Todo List" />
        <meta property="og:description" content="코드잇 스프린트 과제 Todo List 입니다." />
        <meta property="og:image" content="/images/icons/todo_icon_sm.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
