import { NavLink } from "react-router-dom";
import style from './Sidebar.module.css';

const Sidebar = () => {
  const setActive = ({isActive}) => isActive ? style.active : style.link;
  return (
    <nav className= {style.sidebar}>
      <ul className= {style.menu}>
        <li className={style.item}>
          <NavLink className={setActive} to="/profile">profile</NavLink>
        </li>
        <li className={style.item}>
          <NavLink className={setActive} to="/messages">Messages</NavLink>
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
    </nav>
  );
} 

export default Sidebar;
