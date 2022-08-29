import { FC } from "react";
import { profileState } from "../../redux/reducers/profile";
import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile: FC<profileState> = ({postData, userProfileData, profileStatus}) => {
  return(
    <>
      <ProfileInfo {...{userProfileData, profileStatus}}/>
      <Mypost {...{postData}}/>
    </>
  );
}
export default Profile;