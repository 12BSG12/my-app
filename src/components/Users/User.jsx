import style from './Users.module.css';
import { NavLink } from "react-router-dom";

const User = (props) => {
  const btn = () => props.followed 
  ? <button className={style.btn} onClick={()=> props.unFollow(props.id)}>UnFollow</button>
  : <button className={style.btn} onClick={()=> props.follow(props.id)}>Follow</button>;
  return (
    <div className={style.item}>
        <div className={style.left}>          
          <NavLink to={"/profile/" + props.id}><img className={style.img} src={props.photos} alt="" /></NavLink>
          {btn()}
        </div>
        <div className={style.right}>
          <div className={style.info}>
            <div className={style.name}>{props.name}</div>
            <div className={style.stays}>{props.status}</div>
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