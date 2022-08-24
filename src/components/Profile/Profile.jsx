import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({updateProfileStatusThunkCreator, postData, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus, updateProfileStatusThunkCreator}}/>
      <Mypost {...{postData}}/>
    </>
  );
}
export default Profile;