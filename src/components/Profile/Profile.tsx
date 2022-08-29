import { FC } from "react";
import { profileType } from "../../models/profileType";
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile: FC<profileType> = ({postData, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus}}/>
      <MyPost {...{postData}}/>
    </>
  );
}
export default Profile;