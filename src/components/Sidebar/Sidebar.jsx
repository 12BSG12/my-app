import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className= {style.sidebar}>
      <ul className= {style.menu}>
        <li className={style.item}>
          <a href="#">Profile</a>
        </li>
        <li className={style.item}>
          <a href="#">Messages</a>
        </li>
        <li className={style.item}>
          <a href="#">News</a>
        </li>
        <li className={style.item}>
          <a href="#">Music</a>
        </li>
        <li className={style.item}>
          <a href="#">Settings</a>
        </li>
      </ul>
    </nav>
  );
} 

export default Sidebar;
