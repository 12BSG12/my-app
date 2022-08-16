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
          <li className={style.active}><a href="#">Sign In</a></li>
          <li><a href="#">Sign Up</a></li>
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