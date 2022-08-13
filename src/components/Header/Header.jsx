import style from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div className={style.header}>
      <img className={style.logo} src="https://via.placeholder.com/50" alt=''/>
      <div className={style.loginBlock}>
        {props.isAuth ? props.login : <NavLink className={style.link} to="/login">Login</NavLink>}
        <img  className={style.userPhoto} src={props.photo} alt=''/>
      </div>
    </div>
  );
} 

export default Header;
