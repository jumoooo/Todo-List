// components/icons/InputWrapperSVG.tsx
interface InputWrapperSVGProps {
  width?: string | number; // 기본값: "100%"
  height?: string | number; // 기본값: 56
  backgroundColor?: string; // 내부 사각형 색상
  borderColor?: string; // 테두리 색상
}

export default function InputWrapperSVG({
  width = 1000,
  height = 56,
  backgroundColor = '#F1F5F9',
  borderColor = '#0F172A',
}: InputWrapperSVGProps) {
  const numericWidth = typeof width === 'number' ? width : 1000; // 기본 px값
  const numericHeight = typeof height === 'number' ? height : 56;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${numericWidth} ${numericHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* 외부 테두리 */}
      <rect
        x="5"
        y="4.5"
        width={
          typeof width === 'number'
            ? width - 6
            : width.includes('%')
            ? `calc(${width} - 6px)`
            : Number(width) - 6
        }
        height={
          typeof height === 'number'
            ? height - 5.5
            : height.includes('%')
            ? `calc(${height} - 5.5px)`
            : Number(width) - 5.5
        }
        rx="23"
        fill={borderColor}
        stroke={borderColor}
        strokeWidth={2}
      />
      {/* 내부 배경 */}
      <rect
        x="1"
        y="1"
        width={
          typeof width === 'number'
            ? width - 6
            : width.includes('%')
            ? `calc(${width} - 6px)`
            : Number(width) - 6
        }
        height={
          typeof height === 'number'
            ? height - 5.5
            : height.includes('%')
            ? `calc(${height} - 5.5px)`
            : Number(width) - 5.5
        }
        rx="23"
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={2}
      />
    </svg>
  );
}
