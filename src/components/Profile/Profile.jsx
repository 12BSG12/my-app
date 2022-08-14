import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  const {postData, newPostText, onPostChange, onAddPost, userProfileData} = props;
  return(
    <>
      <ProfileInfo {...userProfileData}/>
      <Mypost {...{postData, newPostText, onPostChange, onAddPost}}/>
    </>
  );
}

export default Profile;