import Skeleton from "./Skeleton";
import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";
import style from './Sidebar.module.css';
import { FC } from "react";
import { ISidebar } from "./ISidebar";

const Sidebar: FC<ISidebar> = ({friendsData, isLoading}) => {
  const getFriends = friendsData.map(friend => <NavLink to={"/profile/" + friend.id} key={friend.id}><Friends name={friend.name} photo={friend.photos.small}/></NavLink>);
  const setActive = ({isActive}: any) => isActive ? style.active : style.link;
  return (
    <div className= {style.sidebar}>
      <ul className= {style.menu}>
        <li className={style.item}>
          <NavLink className={setActive} to="/profile">Profile</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/dialogs">Messages</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/news">News</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/music">Music</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/users">Find users</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/settings">Settings</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/chat">chat</NavLink>
        </li>
      </ul>
      
      <div className={style.title}>Friends</div>
      {
        isLoading ? <Skeleton /> :
        <div className={style.friends}>
          {getFriends}
        </div>
      }
    </div>
  );
} 

export default Sidebar;
