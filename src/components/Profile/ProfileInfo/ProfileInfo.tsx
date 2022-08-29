import { FC } from "react";
import Header from "../Header/Header";
import User from "../User/User";
import { IProfileInfo } from "./IProfileInfo";

const ProfileInfo: FC<IProfileInfo> = ({userProfileData, profileStatus}) => {
  return(
    <>
      <Header />
      <User userProfileData={userProfileData} profileStatus={profileStatus}/>
    </>
  );
}

export default ProfileInfo