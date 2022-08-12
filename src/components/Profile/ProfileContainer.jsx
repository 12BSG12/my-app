import { Component } from 'react';
import * as axios from 'axios';
import Profile from './Profile';
import { connect } from 'react-redux'
import {toggleFetchingPage} from '../../redux/preloader-reducer'
import Preloader from '../common/Preloader/Preloader';
import { upadatePostText, addPost, setUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};
class ProfileContainer extends Component {
  componentDidMount(){
    this.props.toggleFetchingPage(true);
    let userID = this.props.params.userId;
    if (!userID) userID = 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`).then(response =>{
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

export default connect(mapStateToProps, {setUserProfile, toggleFetchingPage, upadatePostText, addPost})(withRouter(ProfileContainer));