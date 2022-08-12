import { Component } from 'react';
import * as axios from 'axios';
import Profile from './Profile';
import { connect } from 'react-redux'
import {toggleFetchingPage} from '../../redux/preloader-reducer'
import Preloader from '../common/Preloader/Preloader';
import { upadatePostText, addPost, setUserProfile } from '../../redux/profile-reducer';

class ProfileContainer extends Component {
  componentDidMount(){
    this.props.toggleFetchingPage(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response =>{
      this.props.toggleFetchingPage(false);
      this.props.setUserProfile(response.data)
    });
  }
  render(){
    return (
      <main>
        {!this.props.userProfileData || this.props.isFetching ? <Preloader /> 
        : <Profile userProfileData={this.props.userProfileData}
         postData = {this.props.postData} newPostText ={this.props.newPostText} 
         upadatePostText={this.props.upadatePostText} addPost={this.props.addPost}/>}
      </main>
    );
  }
}
const mapStateToProps = (state) =>({
  userProfileData: state.profilePage.userProfileData,
  isFetching: state.preloader.isFetching,
  postData: state.profilePage.postData,
  newPostText: state.profilePage.newPostText
});

export default connect(mapStateToProps, {setUserProfile, toggleFetchingPage, upadatePostText, addPost})(ProfileContainer);