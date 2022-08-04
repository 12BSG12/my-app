import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className= {style.sidebar}>
      <ul className= {style.menu}>
        <li className={style.item}>
          <a href="/profile">Profile</a>
        </li>
        <li className={style.item}>
          <a href="/dialogs">Messages</a>
        </li>
        <li className={style.item}>
          <a href="/news">News</a>
        </li>
        <li className={style.item}>
          <a href="/music">Music</a>
        </li>
        <li className={style.item}>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
} 

export default Sidebar;
