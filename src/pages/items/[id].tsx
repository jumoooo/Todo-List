import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchGetIdItem } from '@/lib/fetch-crud-item';
import { useCallback, useContext } from 'react';
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
  if (!item) return '문제 발생';
  let icon_src = '/images/icons/chk_no_icon.svg';
  if (item.isCompleted) {
    icon_src = '/images/icons/chk_ok_icon.svg';
  }

  return (
    <div className={style.ItemDetail}>
      <div className={style.container}>
        <section className="section_title">
          <div className={style.title_wrapper}>
            <img onClick={() => console.log('hi')} src={icon_src} sizes="3232" />
            <div
              className={style.text}
              style={item.isCompleted ? { textDecoration: 'line-through' } : {}}
            >
              {item.name}
            </div>
          </div>
        </section>
        <section className={style.section_contents}>
          <div className={style.img_wrapper}>
            <button className={style.img_btn}>
              <img src="/images/icons/plus_bl_icon_sm.png" />
            </button>
          </div>
          <div className={style.memo_wrapper}>
            <h2>Memo</h2>
            <div contentEditable suppressContentEditableWarning>
              {'오메가 3, 프로폴리스, 아연 챙겨먹기'}
            </div>
          </div>
        </section>
        <section className={style.section_btn}>
          <Button
            text="수정 완료"
            onClick={() => {}}
            child={<img src="/images/icons/check_icon.svg" width={16} height={16} />}
          />
          <Button
            text="삭제하기"
            onClick={() => {}}
            color={'#F43F5E'}
            textColor={'white'}
            child={<img src="/images/icons/x_icon.svg" width={16} height={16} />}
          />
        </section>
      </div>
    </div>
  );
}
