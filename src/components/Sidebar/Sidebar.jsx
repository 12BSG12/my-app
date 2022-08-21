import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";
import style from './Sidebar.module.css';

const Sidebar = ({friendsData}) => {
  const getFriends = friendsData.map(friend => <NavLink to={"/profile/" + friend.id} key={friend.id}><Friends name={friend.name} photo={friend.photos.small}/></NavLink>);
  const setActive = ({isActive}) => isActive ? style.active : style.link;
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
      </ul>
      <div className={style.title}>Friends</div>
      <div className={style.friends}>
        {getFriends}
      </div>
    </div>
  );
} 

export default Sidebar;
