import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({updateProfileStatusThunkCreator, postData, onSubmit, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus, updateProfileStatusThunkCreator}}/>
      <Mypost {...{postData, onSubmit}}/>
    </>
  );
}
export default Profile;