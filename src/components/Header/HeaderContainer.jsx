import { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setUserData } from '../../redux/auth-reducer';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import { usersAPI } from '../../api/api';

class HeaderContainer extends Component{
  componentDidMount(){
    usersAPI.auth.getAuth().then(data => {
      if(data.resultCode === 0){
        let {id, email, login} = data.data;
        usersAPI.profile.getProfile(id).then(data =>  {
          let photo = data.photos.small ?? defaultAvatar;
          this.props.setUserData(id, email, login, photo)
        });
      }
    });
  }
  render(){
    return(
      <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo}/>
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

export default connect(mapStateToProps,{setUserData})(HeaderContainer)