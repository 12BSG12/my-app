import style from './User.module.css';
import st from './EditForm.module.scss';
import defaultAvatar from '../../../assets/images/default_avatar.webp';
import UserStatus from './UserStatus';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { setProfilePhotoAsyncThunk, userType } from '../../../redux/reducers/profile'
import { FC, useState } from 'react';
import {Suspense, lazy} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import { useAppDispatch } from '../../../hooks/hooks';

const EditForm = lazy(() => import('./EditForm'));
interface IProfileInfo {
  userProfileData: userType | null
  profileStatus: string
}

const User: FC<IProfileInfo> = ({profileStatus, userProfileData}) => {
  const [isEdit, setEdit] = useState(false);
  let dispatch =  useAppDispatch()

  const cts = Object.values(userProfileData?.contacts !== null).every(n => n === null) && "...";
  const getLinks = Object.entries(userProfileData?.contacts !== null).map((links,i) => <a href={String(links[1])} target='_blank' key={i} rel="noreferrer noopener">{!links[1] ? null : links[0]}</a>);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{ 
    if(e.target.files?.length) dispatch(setProfilePhotoAsyncThunk(e.target.files[0]));
  }

  let isOwner = useParams().userId;
  return (
    <div className={style.user}>
      <div className={style.avatar}>
      <Button component="label">
        {
          !isOwner &&
          <input 
            name="photo"
            // component='input'
            type="file"
            hidden
            onChange={(e) => onChange(e)}
          />
        }
        <img className={style.avatar__img} src={userProfileData?.photos?.large??defaultAvatar} alt=''/>
      </Button>
      {!isOwner && <button className={st.btn} onClick={() => setEdit(!isEdit)}>Edit</button>}
      </div>
      <div className={style.body}>
        <div className={style.name}>{userProfileData?.fullName}</div>
        <UserStatus status={profileStatus}/>
        {
          isEdit ? <Suspense fallback={<Preloader />}><EditForm /></Suspense> :
          <>
            <div className={style.about}>About me: {userProfileData?.aboutMe??'...'}</div>
            <div className={style.contacts}>
              <div className={style.contacts_title}>Contacts: {cts}</div>
              <div className={style.links}>
                {getLinks}
              </div>
              <div className={style.job}>Looking for a Job: {userProfileData?.lookingForAJob ? 'yes' : 'no'}</div>
              <div className={style.job}>Job description: {userProfileData?.lookingForAJobDescription??'...'}</div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default User;