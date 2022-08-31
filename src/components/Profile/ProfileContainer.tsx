import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import { setUserProfileAsyncThunk, setProfileStatusAsyncThunk } from '../../redux/reducers/profile';
import { useParams } from 'react-router-dom';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const ProfileContainer = () => {
  let {userProfileData, isFetching, postData, profileStatus} = useAppSelector(state => state.profilePage);
  let defaultID = useAppSelector(state => state.auth.id);
  
  let dispatch = useAppDispatch();

  let userID = Number(useParams().userId);
  if (!userID) (userID as number | null) = defaultID;

  useEffect(() =>{
    dispatch(setUserProfileAsyncThunk(userID));
    dispatch(setProfileStatusAsyncThunk(userID));
  }, [dispatch, userID]);

  return (
    <main>
      {!userProfileData || isFetching ? <Preloader /> 
      : <Profile {...{userProfileData, postData, profileStatus}}/>}
    </main>
  );
}

export default withAuthNavigate(ProfileContainer);
