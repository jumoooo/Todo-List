# 📝 Codeit Todo List

이 프로젝트는 **Next.js**와 TypeScript로 개발된 **할일 관리(Todo List) 웹 애플리케이션**입니다.  
사용자는 할일을 **추가, 조회, 수정, 삭제**할 수 있으며, 이미지와 메모를 함께 관리할 수 있습니다.

[🔗 Vercel 배포 링크](https://codeit-todo-list-five.vercel.app/)

---

## ⚡ 주요 기능

### 메인 페이지

- 텍스트 입력 후 **Enter** 키 또는 **추가하기 버튼**으로 새로운 할일 등록
  - 연속 클릭으로 인한 중복 추가 방지
- 화면 중간에 할일 리스트 표시
  - **체크 버튼** 클릭 시 완료/할일 상태 전환
    - Todo → 완료
    - 완료 → Todo
  - 체크 버튼 외 다른 부분 클릭 시 **상세 페이지**로 이동

### 할일 상세 페이지

- **제목, 이미지, 메모** 수정 가능
- 이미지 업로드 제한
  - 최대 용량: 5MB
  - 파일 이름: 영문과 숫자만 가능
- **수정 버튼** 클릭 시 변경 사항 저장 후 홈 페이지로 이동
- **삭제 버튼** 클릭 시 확인 후 삭제 후 홈 페이지로 이동

### 추가 기능

- 버튼과 아이템 이미지 모두 **SVG 컴포넌트**로 구현
- 폰트는 최적화를 위해 **woff2** 적용
- 각 페이지마다 **Head**를 활용하여 동적 타이틀 설정
- 모바일, 태블릿, 데스크탑 모두 대응 가능한 **반응형 UI**
- 추가, 수정, 삭제 시 **중복 입력 제어** 적용
- 추가, 수정, 삭제 시 데이터 리렌더링, 로딩 변수 관리하는 커스텀 Hook(useFetchWithRefetch) 사용 함

---

### 파일 구조

- pages/: Next.js 페이지 (index.tsx, items/[id].tsx)
- components/: 재사용 가능한 컴포넌트 (Button, Item, TodoTitle, ImageUploader, MemoEditor 등)
- lib/: API 요청 함수
- hooks/: 커스텀 훅
- types/: TypeScript 타입 정의

## 🚀 개발 환경

### 설치 및 실행

```bash
npm install
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```
