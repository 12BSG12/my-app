import { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import Preloader from '../common/Preloader/Preloader';
import { addPost, setUserProfileThunkCreator, setProfileStatusThunkCreator, updateProfileStatusThunkCreator} from '../../redux/profile-reducer';
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

  onSubmit = (formData) => {
    this.props.addPost(formData.message);
    formData.message = null;
  }

  render(){
    const {userProfileData, postData, profileStatus, updateProfileStatusThunkCreator} = this.props;
    return (
      <main>
        {!userProfileData || this.props.isFetching ? <Preloader /> 
        : <Profile {...{userProfileData, postData, profileStatus, updateProfileStatusThunkCreator}} onSubmit={this.onSubmit}/>}
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfileData: state.profilePage.userProfileData,
  isFetching: state.profilePage.isFetching,
  postData: state.profilePage.postData,
  defualutID: state.auth.id,
  profileStatus: state.profilePage.profileStatus,
});

export default compose(connect(mapStateToProps, {setUserProfileThunkCreator, setProfileStatusThunkCreator, updateProfileStatusThunkCreator, addPost}), withRouter, withAuthNavigate)(ProfileContainer);
