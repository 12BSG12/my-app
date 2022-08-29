import { FC } from "react";
import { profileState } from "../../redux/reducers/profile";
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile: FC<profileState> = ({postData, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus}}/>
      <MyPost {...{postData}}/>
    </>
  );
}
export default Profile;