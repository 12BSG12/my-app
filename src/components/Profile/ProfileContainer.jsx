import { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import Preloader from '../common/Preloader/Preloader';
import { upadatePostText, addPost, setUserProfileThunkCreator } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

class ProfileContainer extends Component {
  componentDidMount(){
    let userID = this.props.params.userId;
    if (!userID) userID = this.props.defualutID;
    this.props.setUserProfileThunkCreator(userID);
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
    const {userProfileData, postData, newPostText} = this.props;
    return (
      <main>
        {!this.props.userProfileData || this.props.isFetching ? <Preloader /> 
        : <Profile {...{userProfileData, postData, newPostText}} onPostChange={this.onPostChange} onAddPost={this.onAddPost}/>}
      </main>
    );
  }
}
const mapStateToProps = (state) =>({
  userProfileData: state.profilePage.userProfileData,
  isFetching: state.profilePage.isFetching,
  postData: state.profilePage.postData,
  newPostText: state.profilePage.newPostText,
  defualutID: state.auth.id
});

export default connect(mapStateToProps, {setUserProfileThunkCreator, upadatePostText, addPost})(withAuthNavigate(withRouter(ProfileContainer)));