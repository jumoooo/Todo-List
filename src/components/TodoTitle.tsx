import style from './TodoTitle.module.css';

interface TodoTitleProps {
  input_value?: string;
  isChecked?: Boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoTitle: React.FC<TodoTitleProps> = ({
  input_value = '',
  isChecked = false,
  onClick,
  onChange,
}) => {
  const nameStyle = isChecked
    ? { backgroundColor: 'var(--color-violet-100)' }
    : { backgroundColor: '#FFFFFF' };
  const image_src = isChecked ? '/images/icons/chk_ok_icon.svg' : '/images/icons/chk_no_icon.svg';
  return (
    <div className={style.todoTitle} style={nameStyle}>
      <img className={style.todoTitle__icon} onClick={onClick} src={image_src} />
      <input className={style.todoTitle__input} value={input_value} onChange={onChange} />
    </div>
  );
};
export default TodoTitle;
