import style from './ListItem.module.css';

export default function ListItem({
  id,
  isCompleted = true,
  name = '',
}: {
  id: number;
  isCompleted?: Boolean;
  name?: string;
}) {
  let iconSrc = '/images/icons/chk_no_icon.svg';
  if (isCompleted) {
    iconSrc = '/images/icons/chk_ok_icon.svg';
  }
  return (
    <div
      className={style.ListItem}
      style={isCompleted ? { backgroundColor: '#EDE9FE' } : { backgroundColor: '#FFFFFF' }}
    >
      <img onClick={() => console.log(id)} src={iconSrc} sizes="3232" />
      <div className={style.text} style={isCompleted ? { textDecoration: 'line-through' } : {}}>
        {name}
      </div>
    </div>
  );
}
