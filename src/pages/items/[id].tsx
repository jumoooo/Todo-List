import style from './[id].module.css';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchGetIdItem, fetchUpdateItem, fetchUploadImage } from '@/lib/fetch-crud-item';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TodoListUpdateData } from '@/types';
import { useParams } from 'next/navigation';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRefetchLoading } from '@/hooks/useRefetchLoading';

import Button from '@/components/Button';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id;
  const item = await fetchGetIdItem(Number(id));
  return {
    props: { item },
  };
};

export default function ItemDetail({
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [todoData, setTodoData] = useState(item);
  const memoRef = useRef<HTMLDivElement>(null);
  const param = useParams();
  const id = Number(param.id);
  const router = useRouter();

  useEffect(() => {
    if (memoRef.current && todoData?.memo) {
      memoRef.current.innerText = todoData.memo;
    }
  }, []);

  // 화면 데이터 리프레쉬
  const refetchList = useCallback(async () => {
    try {
      const fresh = await fetchGetIdItem(Number(id));
      setTodoData(fresh);
    } catch (err) {
      console.log(err);
    }
  }, [param]);

  const { fetching: updateTodo, isLoading: updateLoading } = useRefetchLoading(
    refetchList,
    fetchUpdateItem,
  );
  const { deleteTodo, isLoading: deleteLoading } = useDeleteTodo();

  // 이미지 유효성 검사
  const validateFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 용량은 최대 5MB까지 가능합니다.');
      return false;
    }
    const regex = /^[a-zA-Z0-9_\-]+\.[a-zA-Z]{1,5}$/;
    if (!regex.test(file.name)) {
      alert('파일 이름은 영어, 숫자, _, - 만 가능합니다.');
      return false;
    }
    return true;
  };

  // todoData에 imageURL 추가
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) {
      e.target.value = '';
      return;
    }
    // 이미지 업로드
    const imageUrl = await fetchUploadImage(file);
    if (!imageUrl) return;
    if (todoData) {
      setTodoData({
        ...todoData,
        imageUrl: imageUrl,
      });
    }
  };

  // 수정 버튼 클릭
  const onClickUpdate = useCallback(async () => {
    if (!id || !todoData || updateLoading || !window.confirm('수정 하시겠습니까?')) return;

    const updateData: TodoListUpdateData = {
      name: todoData.name,
      memo: todoData.memo,
      imageUrl: todoData.imageUrl,
      isCompleted: todoData.isCompleted,
    };
    // 변경
    await updateTodo(id, updateData);
    window.alert('수정 완료되었습니다.');
  }, [id, todoData, updateLoading]);

  // 삭제 버튼 클릭
  const onChickDelete = useCallback(async () => {
    if (!id || !todoData || deleteLoading || !window.confirm('삭제 하시겠습니까?')) return;

    await deleteTodo(id);
    if (!deleteLoading) router.push('/');
  }, [id, todoData, deleteLoading]);

  const img_src = todoData?.isCompleted
    ? '/images/icons/chk_ok_icon.svg'
    : '/images/icons/chk_no_icon.svg';

  const nameStyle = todoData?.isCompleted
    ? { backgroundColor: 'var(--color-violet-100)' }
    : { backgroundColor: '#FFFFFF' };

  const updateLoadingText = updateLoading ? '로딩중...' : '수정 완료';

  const deleteLoadingText = deleteLoading ? '로딩중...' : '삭제하기';
  const hasImage = Boolean(todoData?.imageUrl);

  return (
    <div className={style.detailPage}>
      <Head>
        <title>{todoData?.name} (할 일 상세 페이지)</title>
      </Head>
      <div className={style.detailContainer}>
        <section className="section_title">
          <div className={style.title_wrapper} style={nameStyle}>
            <img
              onClick={() => setTodoData({ ...todoData!, isCompleted: !todoData!.isCompleted })}
              src={img_src}
            />
            <input
              value={todoData?.name}
              onChange={(e) => setTodoData({ ...todoData!, name: e.target.value })}
              className={style.text}
            />
          </div>
        </section>
        <section className={style.section_contents}>
          <div
            className={hasImage ? style.img_full_wrapper : style.img_empty_wrapper}
            style={hasImage ? { backgroundImage: `url(${todoData?.imageUrl})` } : {}}
          >
            <label
              className={style.img_btn}
              style={{ backgroundColor: hasImage ? '#0F172A80' : 'var(--color-salte-200)' }}
            >
              <img
                src={hasImage ? '/images/icons/edit_icon.svg' : '/images/icons/plus_bl_icon_sm.png'}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className={style.memo_wrapper}>
            <h2>Memo</h2>
            <div
              ref={memoRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                setTodoData({ ...todoData!, memo: (e.target as HTMLElement).innerText })
              }
            ></div>
          </div>
        </section>
        <section className={style.section_btn}>
          <Button
            text={updateLoadingText}
            onClick={onClickUpdate}
            holdSize={true}
            child={<img src="/images/icons/check_icon.svg" width={16} height={16} />}
          />
          <Button
            text={deleteLoadingText}
            onClick={onChickDelete}
            color={'var(--color-rose-500)'}
            textColor={'white'}
            holdSize={true}
            child={<img src="/images/icons/x_icon.svg" width={16} height={16} />}
          />
        </section>
      </div>
    </div>
  );
}
