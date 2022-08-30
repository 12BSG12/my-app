import style from './Users.module.css';
import { NavLink } from "react-router-dom";
import { FC } from 'react';
import { IUser } from './IUser';

//disabled={followindInProgress.some(item => item.id === id)}

const User: FC<IUser> = ({followed, loading, followindInProgress, id, photos, unFollow, follow, name, status}) => {
  const btn = followed 
  ? <button className={style.btn} disabled={loading} onClick={()=> unFollow(id)}>UnFollow</button>
  : <button className={style.btn} disabled={loading} onClick={()=> follow(id)}>Follow</button>;
  return (
    <div className={style.item}>
        <div className={style.left}>          
          <NavLink to={"/profile/" + id}><img className={style.img} src={photos} alt="" /></NavLink>
          {btn}
        </div>
        <div className={style.right}>
          <div className={style.info}>
            <div className={style.name}>{name}</div>
            <div className={style.stays}>{status}</div>
          </div>
        </div>
    </div>
  );
}

export default User;