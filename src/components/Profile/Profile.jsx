import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({updateProfileStatusAsyncThunk, postData, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus, updateProfileStatusAsyncThunk}}/>
      <Mypost {...{postData}}/>
    </>
  );
}
export default Profile;