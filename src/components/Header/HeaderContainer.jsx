import { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import * as axios from 'axios';
import { setUserData } from '../../redux/auth-reducer';
import defaultAvatar from '../../assets/images/default_avatar.webp';

class HeaderContainer extends Component{
  componentDidMount(){
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response =>{
      if(response.data.resultCode === 0){
        let {id, email, login} = response.data.data;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then(response =>{
          let photo = response.data.photos.small ?? defaultAvatar;
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