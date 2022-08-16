import { Component } from 'react';
import style from './login.module.css'
import LoginReduxForm from './loginForm';
import { connect } from 'react-redux'
import { loginThunkCreator } from '../../redux/auth-reducer';

class Login extends Component {
  onSubmit = (formData) => {
    this.props.loginThunkCreator(formData)
    console.log(formData);
  }
  render(){
    return (
      <div className={style.formBlock}>
        <ul className={style.formNav}>
          <li className={style.active}>Sign In</li>
          <li>Sign Up</li>
        </ul>
        <div className={style.formUlBlock}>
          <LoginReduxForm onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = (state) =>({
});

export default connect(mapStateToProps, {loginThunkCreator})(Login);