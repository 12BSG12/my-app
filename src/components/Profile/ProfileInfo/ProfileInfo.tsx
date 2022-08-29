import { FC } from "react";
import { userType } from "../../../redux/reducers/profile";
import Header from "../Header/Header";
import User from "../User/User";

interface IProfileInfo {
  userProfileData: userType | null
  profileStatus: string
}

const ProfileInfo: FC<IProfileInfo> = ({userProfileData, profileStatus}) => {
  return(
    <>
      <Header />
      <User userProfileData={userProfileData} profileStatus={profileStatus}/>
    </>
  );
}

export default ProfileInfo