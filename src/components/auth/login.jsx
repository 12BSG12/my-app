import style from './login.module.scss'
import LoginReduxForm from './loginForm';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Login = () => {
  let isAuth = useSelector(state => state.auth.isAuth);

  if(isAuth) return <Navigate to='/profile'/>

  return (
    <div className={style.formBg}>
      <div className={style.container}>
        <ul className={style.formNav}>
          <li className={style.singIn}>Sign In</li>
        </ul>
        <LoginReduxForm />
      </div>
    </div>
  );
}

export default Login;
