import { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setUserDataThunkCreator, logOutThunkCreator } from '../../redux/auth-reducer';

class HeaderContainer extends Component{
  componentDidMount(){
    this.props.setUserDataThunkCreator();
  }

  onClickLogOut = () => {
    this.props.logOutThunkCreator();
  }
  
  render(){
    return(
      <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo} onClickLogOut={this.onClickLogOut}/>
    );
  }
}

const mapStateToProps = (state) =>({
  id: state.auth.id,
  login: state.auth.login,
  isAuth: state.auth.isAuth,
  photo: state.auth.photo
});

export default connect(mapStateToProps,{setUserDataThunkCreator, logOutThunkCreator})(HeaderContainer)