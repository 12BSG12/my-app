import { FC } from "react";
import { NavLink } from "react-router-dom";
import { dialogs } from "../../../redux/reducers/dialogs";
import style from './User.module.css';


const User: FC<dialogs> = ({id, name}) => {
  const setActive = ({isActive}:any) => isActive ? style.active : style.link;
  return (
    <div className={style.item}>
      <span className={style.dot}>dot</span>
      <NavLink className={setActive} to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  );
} 

export default User;
