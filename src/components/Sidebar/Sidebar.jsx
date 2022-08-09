import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";
import style from './Sidebar.module.css';

const Sidebar = (props) => {
  const getFriends = props.friendsData.map(friend => <Friends name={friend.name} key={friend.id}/>);
  const setActive = ({isActive}) => isActive ? style.active : style.link;
  return (
    <div className= {style.sidebar}>
      <ul className= {style.menu}>
        <li className={style.item}>
          <NavLink className={setActive} to="/profile">profile</NavLink>
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
