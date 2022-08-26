import Header from "../Header/Header";
import User from "../User/User";

const ProfileInfo = ({userProfileData, profileStatus, updateProfileStatusAsyncThunk}) => {
  return(
    <>
      <Header />
      <User {...userProfileData} profileStatus={profileStatus} updateProfileStatusAsyncThunk={updateProfileStatusAsyncThunk}/>
    </>
  );
}

export default ProfileInfo