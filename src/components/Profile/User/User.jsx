import style from './User.module.css';
import defaultAvatar from '../../../assets/images/default_avatar.webp';
import UserStatus from './UserStatus';

const User = (props) => {
  const contacts = Object.values(props.contacts).every(n => n === null) && "...";
  const getLinks = Object.entries(props.contacts).map((links,i) => <a href={links[1]} target='_blank' key={i} rel="noreferrer noopener">{!links[1] ? null : links[0]}</a>);
  return (
    <div className={style.user}>
      <div className={style.avatar}>
        <img className={style.avatar__img} src={props.photos.large??defaultAvatar} alt=''/>
      </div>
      <div className={style.body}>
        <div className={style.name}>{props.fullName}</div>
        <UserStatus status = {props.profileStatus} updateProfileStatusThunkCreator={props.updateProfileStatusThunkCreator}/>
        <div className={style.about}>About me: {props.aboutMe??'...'}</div>
        <div className={style.contacts}>
          <div className={style.contacts_title}>Contacts: {contacts}</div>
          <div className={style.links}>
            {getLinks}
          </div>
        </div>
      </div>
    </div>
  );
} 

export default User;