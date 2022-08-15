import { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import Preloader from '../common/Preloader/Preloader';
import { upadatePostText, addPost, setUserProfileThunkCreator, setProfileStatusThunkCreator, updateProfileStatusThunkCreator} from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

class ProfileContainer extends Component {
  componentDidMount(){
    let userID = this.props.params.userId;
    if (!userID) userID = this.props.defualutID;
    this.props.setUserProfileThunkCreator(userID);
    this.props.setProfileStatusThunkCreator(userID);
  }
  onPostChange = (e) => {
    let text = e.target.value;
    this.props.upadatePostText(text)
  };
  onAddPost = () => {
    if(this.props.newPostText !== ''){
      this.props.addPost();
    }
    else
      alert('Введите текст поста')
  };

  render(){
    const {userProfileData, postData, newPostText, profileStatus, updateProfileStatusThunkCreator} = this.props;
    return (
      <main>
        {!userProfileData || this.props.isFetching ? <Preloader /> 
        : <Profile {...{userProfileData, postData, newPostText, profileStatus, updateProfileStatusThunkCreator}} onPostChange={this.onPostChange} onAddPost={this.onAddPost}/>}
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfileData: state.profilePage.userProfileData,
  isFetching: state.profilePage.isFetching,
  postData: state.profilePage.postData,
  newPostText: state.profilePage.newPostText,
  defualutID: state.auth.id,
  profileStatus: state.profilePage.profileStatus,
});

export default compose(connect(mapStateToProps, {setUserProfileThunkCreator, setProfileStatusThunkCreator, updateProfileStatusThunkCreator, upadatePostText, addPost}), withRouter, withAuthNavigate)(ProfileContainer);
