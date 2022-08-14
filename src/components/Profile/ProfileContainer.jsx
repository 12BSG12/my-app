import { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import {toggleFetchingPage} from '../../redux/preloader-reducer'
import Preloader from '../common/Preloader/Preloader';
import { upadatePostText, addPost, setUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../api/api';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};
class ProfileContainer extends Component {
  componentDidMount(){
    this.props.toggleFetchingPage(true);
    let userID = this.props.params.userId;
    if (!userID) userID = this.props.defualutID;
    usersAPI.profile.getProfile(userID).then(data => {
      this.props.toggleFetchingPage(false);
      this.props.setUserProfile(data);
    });
  }
  render(){
    const {userProfileData, postData, newPostText, upadatePostText, addPost} = this.props;
    return (
      <main>
        {!this.props.userProfileData || this.props.isFetching ? <Preloader /> 
        : <Profile {...{userProfileData, postData, newPostText, upadatePostText, addPost}}/>}
      </main>
    );
  }
}
const mapStateToProps = (state) =>({
  userProfileData: state.profilePage.userProfileData,
  isFetching: state.preloader.isFetching,
  postData: state.profilePage.postData,
  newPostText: state.profilePage.newPostText,
  defualutID: state.auth.id
});

export default connect(mapStateToProps, {setUserProfile, toggleFetchingPage, upadatePostText, addPost})(withRouter(ProfileContainer));