import style from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = ({isAuth, login, photo, onClickLogOut}) => {
  return (
    <div className={style.header}>
      <img className={style.logo} src="https://via.placeholder.com/50" alt=''/>
      <div className={style.loginBlock}>
        {isAuth ? 
          (<div>
          <div>{login}</div>
          <div className={style.userPhoto}><img src={photo} alt=''/></div>
          <div className={style.logOut} onClick={onClickLogOut}>logout</div>
        </div>) : <NavLink className={style.link} to="/login">Login</NavLink>}
      </div>
    </div>
  );
} 

export default Header;
