import { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setUserDataThunkCreator } from '../../redux/auth-reducer';
import defaultAvatar from '../../assets/images/default_avatar.webp';

class HeaderContainer extends Component{
  componentDidMount(){
    this.props.setUserDataThunkCreator();
  }
  render(){
    return(
      <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo??defaultAvatar}/>
    );
  }
}

const mapStateToProps = (state) =>({
  id: state.auth.id,
  email: state.auth.email,
  login: state.auth.login,
  isAuth: state.auth.isAuth,
  photo: state.auth.photo
});

export default connect(mapStateToProps,{setUserDataThunkCreator})(HeaderContainer)