import { NavLink } from "react-router-dom";
import style from './User.module.css';

const User = (props) => {
  const setActive = ({isActive}) => isActive ? style.active : style.link;
  return (
    <div className={style.item}>
      <span className={style.dot}>dot</span>
      <NavLink className={setActive} to={`/dialogs/${props.id}`}>{props.username}</NavLink>
    </div>
  );
} 

export default User;
