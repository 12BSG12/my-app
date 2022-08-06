import style from './Friends.module.css';

const Friends = (props) => {
  return (
    <div className={style.item}>
        <img className={style.img} src="https://via.placeholder.com/50" alt="" />
        <div className={style.name}>{props.name}</div>
    </div>
  );
}

export default Friends;