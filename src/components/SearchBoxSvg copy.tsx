import { RefObject } from 'react';
import style from './SearchBoxSvg.module.css';

// components/icons/InputWrapperSVG.tsx
interface InputWrapperSVGProps {
  width?: string | number; // 기본값: "100%"
  height?: string | number; // 기본값: 56
  backgroundColor?: string; // 내부 사각형 색상
  borderColor?: string; // 테두리 색상
  containRef?: RefObject<HTMLDivElement>; // widht, height 가 % 일때 참조할 Ref
}

export default function SearchBoxSvg({
  width = 1000,
  height = 56,
  backgroundColor = '#F1F5F9',
  borderColor = '#0F172A',
  containRef,
}: InputWrapperSVGProps) {
  let numericWidth = typeof width === 'number' ? width : 1000;
  let numericHeight = typeof height === 'number' ? height : 56;
  if (containRef) {
    numericWidth = Number(containRef.current?.offsetWidth ?? numericWidth);
    numericHeight = Number(containRef.current?.offsetHeight ?? numericHeight);

    console.log(containRef);
    console.log(numericWidth);
    console.log(numericHeight);
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${numericWidth} ${numericHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      className={style.icon}
    >
      {/* 외부 테두리 */}
      <rect
        x="5"
        y="4.5"
        width={numericWidth - 6}
        height={numericHeight - 5.5}
        rx="23"
        fill={borderColor}
        stroke={borderColor}
        strokeWidth={2}
      />
      {/* 내부 배경 */}
      <rect
        x="1"
        y="1"
        width={numericWidth - 6}
        height={numericHeight - 5.5}
        rx="23"
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={2}
      />
    </svg>
  );
}
