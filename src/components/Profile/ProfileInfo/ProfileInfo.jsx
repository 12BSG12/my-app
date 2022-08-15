import Header from "../Header/Header";
import User from "../User/User";

const ProfileInfo = (props) => {
  const {userProfileData, profileStatus, updateProfileStatusThunkCreator} = props
  return(
    <>
      <Header />
      <User {...userProfileData} profileStatus={profileStatus} updateProfileStatusThunkCreator={updateProfileStatusThunkCreator}/>
    </>
  );
}

export default ProfileInfo