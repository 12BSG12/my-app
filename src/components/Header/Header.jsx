import style from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div className={style.header}>
      <img className={style.logo} src="https://via.placeholder.com/50" alt=''/>
      <div className={style.loginBlock}>
        {props.isAuth ? 
          (<div>
          <div>{props.login}</div>
          <div className={style.userPhoto}><img src={props.photo} alt=''/></div>
          <div className={style.logOut} onClick={props.onClickLogOut}>logout</div>
        </div>) : <NavLink className={style.link} to="/login">Login</NavLink>}
      </div>
    </div>
  );
} 

export default Header;
