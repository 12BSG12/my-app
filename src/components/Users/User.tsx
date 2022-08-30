import style from './Users.module.css';
import { NavLink } from "react-router-dom";
import { FC, useState } from 'react';
import { IUser } from './IUser';

const User: FC<IUser> = ({followed, id, photos, unFollow, follow, name, status}) => {
  const[isDisabled, setIsDisabled] = useState(false)
  const uFlw = async (id: number) => {
    setIsDisabled(true)
    await unFollow(id)
    setIsDisabled(false)
  }
  const flw = async (id: number) => {
    setIsDisabled(true)
    await follow(id)
    setIsDisabled(false)
  }
  const btn = followed 
  ? <button className={style.btn} disabled={isDisabled} onClick={()=> uFlw(id)}>UnFollow</button>
  : <button className={style.btn} disabled={isDisabled} onClick={()=> flw(id)}>Follow</button>;
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