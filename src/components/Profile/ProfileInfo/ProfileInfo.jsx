import Header from "../Header/Header";
import User from "../User/User";

const ProfileInfo = (props) => {
  return(
    <>
      <Header />
      <User {...props}/>
    </>
  );
}

export default ProfileInfo