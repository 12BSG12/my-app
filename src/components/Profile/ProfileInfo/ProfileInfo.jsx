import Header from "../Header/Header";
import User from "../User/User";

const ProfileInfo = ({userProfileData, profileStatus, updateProfileStatusThunkCreator}) => {
  return(
    <>
      <Header />
      <User {...userProfileData} profileStatus={profileStatus} updateProfileStatusThunkCreator={updateProfileStatusThunkCreator}/>
    </>
  );
}

export default ProfileInfo