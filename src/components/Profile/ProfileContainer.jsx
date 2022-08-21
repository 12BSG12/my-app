import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import { addPost, setUserProfileThunkCreator, setProfileStatusThunkCreator, updateProfileStatusThunkCreator} from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const ProfileContainer = () => {
  let userProfileData = useSelector(state => state.profilePage.userProfileData);
  let isFetching = useSelector(state =>  state.profilePage.isFetching);
  let postData = useSelector(state => state.profilePage.postData);
  let defualutID = useSelector(state => state.auth.id);
  let profileStatus = useSelector(state =>  state.profilePage.profileStatus);
  
  let dispatch = useDispatch();

  let userID = useParams().userId;
  if (!userID) userID = defualutID;

  useEffect(() =>{
    dispatch(setUserProfileThunkCreator(userID));
    dispatch(setProfileStatusThunkCreator(userID));
  }, [dispatch, userID]);

  const onSubmit = (formData) => {
    dispatch(addPost(formData.message));
    formData.message = null;
  }
  return (
    <main>
      {!userProfileData || isFetching ? <Preloader /> 
      : <Profile {...{userProfileData, postData, profileStatus, updateProfileStatusThunkCreator}} onSubmit={onSubmit}/>}
    </main>
  );
}

export default withAuthNavigate(ProfileContainer);
