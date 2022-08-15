import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  const {updateProfileStatusThunkCreator, postData, newPostText, onPostChange, onAddPost, userProfileData, profileStatus} = props;
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus, updateProfileStatusThunkCreator}}/>
      <Mypost {...{postData, newPostText, onPostChange, onAddPost}}/>
    </>
  );
}

export default Profile;