import style from './login.module.css'
import LoginReduxForm from './loginForm';
import { loginThunkCreator } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  let isAuth = useSelector(state => state.auth.isAuth);
  
  let dispatch = useDispatch();

  const onSubmit = (formData) => {
    dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe));
  }

  if(isAuth) return <Navigate to='/profile'/>

  return (
    <div className={style.formBlock}>
      <ul className={style.formNav}>
        <li className={style.active}>Sign In</li>
        <li>Sign Up</li>
      </ul>
      <div className={style.formUlBlock}>
        <LoginReduxForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
}

export default Login;
