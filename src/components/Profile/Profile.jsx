import Mypost from "./Myposts/Mypost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return(
    <>
      <ProfileInfo {...props.userProfileData}/>
      <Mypost postData = {props.postData} newPostText ={props.newPostText} 
      upadatePostText={props.upadatePostText} addPost={props.addPost}/>
    </>
  );
}

export default Profile;