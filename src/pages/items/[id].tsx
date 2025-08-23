import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchGetIdItem, fetchUpdateItem, fetchUploadImage } from '@/lib/fetch-crud-item';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import { TodoListUpdateData } from '@/types';
import { useParams } from 'next/navigation';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRefetchLoading } from '@/hooks/useRefetchLoading';

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
  }, [todoData?.id]);

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

  // todoData에 imageURL 추가
  const onClickImageAddBtn = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 용량은 최대 5MB까지 가능합니다.');
      e.target.value = ''; // 선택 초기화
      return;
    }
    const regex = /^[a-zA-Z0-9_\-]+\.[a-zA-Z]{1,5}$/;
    if (!regex.test(file.name)) {
      alert('파일 이름은 영어, 숫자, _, - 만 가능합니다.');
      e.target.value = ''; // 선택 초기화
      return;
    }
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
  const onClickUpdate = () => {
    if (!todoData || updateLoading || !window.confirm('수정 하시겠습니까?')) return;

    const updateData: TodoListUpdateData = {
      name: todoData.name,
      memo: todoData.memo,
      imageUrl: todoData.imageUrl,
      isCompleted: todoData.isCompleted,
    };
    // 변경
    updateTodo(id, updateData);
  };

  // 삭제 버튼 클릭
  const onChickDelete = async () => {
    if (!id || !todoData || deleteLoading || !window.confirm('삭제 하시겠습니까?')) return;

    await deleteTodo(id);
    if (!deleteLoading) router.push('/');
  };
  return (
    <div className={style.ItemDetail}>
      <Head>
        <title>{todoData?.name} (할 일 상세 페이지)</title>
      </Head>
      <div className={style.container}>
        <section className="section_title">
          <div
            className={style.title_wrapper}
            style={
              todoData?.isCompleted
                ? { backgroundColor: 'var(--color-violet-100)' }
                : { backgroundColor: '#FFFFFF' }
            }
          >
            <img
              onClick={() => setTodoData({ ...todoData!, isCompleted: !todoData!.isCompleted })}
              src={
                todoData?.isCompleted
                  ? '/images/icons/chk_ok_icon.svg'
                  : '/images/icons/chk_no_icon.svg'
              }
            />
            <input
              value={todoData?.name}
              onChange={(e) => setTodoData({ ...todoData!, name: e.target.value })}
              className={style.text}
            />
          </div>
        </section>
        <section className={style.section_contents}>
          {todoData?.imageUrl ? (
            <div
              className={style.img_full_wrapper}
              style={{ backgroundImage: `url(${todoData?.imageUrl})` }}
            >
              <label className={style.img_btn} style={{ backgroundColor: '#0F172A80' }}>
                <img src="/images/icons/edit_icon.svg" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onClickImageAddBtn}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          ) : (
            <div className={style.img_empty_wrapper}>
              <label
                className={style.img_btn}
                style={{ backgroundColor: 'var(--color-salte-200)' }}
              >
                <img src="/images/icons/plus_bl_icon_sm.png" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onClickImageAddBtn}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
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
            text={updateLoading ? '로딩중...' : '수정 완료'}
            onClick={onClickUpdate}
            holdSize={true}
            child={<img src="/images/icons/check_icon.svg" width={16} height={16} />}
          />
          <Button
            text={deleteLoading ? '로딩중...' : '삭제하기'}
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
