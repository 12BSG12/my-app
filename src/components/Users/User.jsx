import style from './Users.module.css';

const User = (props) => {
  return (
    <div className={style.item}>
        <div className={style.left}>
          <img className={style.img} src="https://via.placeholder.com/50" alt="" />
          <button className={style.btn}>Follow</button>
        </div>
        <div className={style.right}>
          <div className={style.info}>
            <div className={style.name}>{props.name}</div>
            <div className={style.stays}>{props.stays}</div>
          </div>
          <div className={style.location}>
            <div className={style.counrty}>{props.counrty},</div>
            <div className={style.city}>{props.city}</div>
          </div>
        </div>
    </div>
  );
}

export default User;