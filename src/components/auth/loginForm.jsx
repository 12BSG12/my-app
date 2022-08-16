import style from './login.module.css'
import { Field, reduxForm } from 'redux-form'
import {Element} from '../common/FormControls/FormControls'
import {required} from '../../util/validators/validators'

const Input = Element("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <ul className={style.formUl}>
        <li>
          <div className={style.item}>
            <label htmlFor="name">E-Mail</label>
            <Field name="email" type="email" component={Input} validate={[required]}/>
          </div>
        </li>
        <li>
          <div className={style.item}>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" component={Input} validate={[required]}/>
          </div>
        </li>
        <li>
          <div className={style.formBottom}>
            <div className={style.checkbox}>
              <Field type="checkbox" name="rememberMe" component="input"/>
              <p>remember me</p>
            </div>
            <button type="submit">Sign in</button>
          </div>
        </li>
      </ul>
    </form>
  );
} 

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)
export default LoginReduxForm;