import style from './User.module.css';
import defaultAvatar from '../../../assets/images/default_avatar.webp';
import UserStatus from './UserStatus';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePhotoThunkCreator } from '../../../redux/profile-reducer'

const User = ({contacts, updateProfileStatusThunkCreator, photos, fullName, profileStatus, aboutMe}) => {

  let dispatch =  useDispatch()

  const cts = Object.values(contacts).every(n => n === null) && "...";
  const getLinks = Object.entries(contacts).map((links,i) => <a href={links[1]} target='_blank' key={i} rel="noreferrer noopener">{!links[1] ? null : links[0]}</a>);

  const onChange = (e) =>{
    dispatch(updateProfilePhotoThunkCreator(e.target.files[0]));
  }

  return (
    <div className={style.user}>
      <div className={style.avatar}>
      <Button component="label">
        <input 
          name="photo"
          component='input'
          type="file"
          hidden
          onChange={(e) => onChange(e)}
        />
        <img className={style.avatar__img} src={photos.large??defaultAvatar} alt=''/>
      </Button>
      </div>
      <div className={style.body}>
        <div className={style.name}>{fullName}</div>
        <UserStatus status = {profileStatus} updateProfileStatusThunkCreator={updateProfileStatusThunkCreator}/>
        <div className={style.about}>About me: {aboutMe??'...'}</div>
        <div className={style.contacts}>
          <div className={style.contacts_title}>Contacts: {cts}</div>
          <div className={style.links}>
            {getLinks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;