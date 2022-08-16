import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  const {updateProfileStatusThunkCreator, postData, onSubmit, userProfileData, profileStatus} = props;
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus, updateProfileStatusThunkCreator}}/>
      <Mypost {...{postData, onSubmit}}/>
    </>
  );
}

export default Profile;