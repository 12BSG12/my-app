import style from './User.module.css';
import defaultAvatar from '../../../assets/images/default_avatar.webp';

const User = (props) => {
  const getLinks = Object.entries(props.contacts).map(links => <a href={links[1]} target='_blank' rel="noreferrer noopener">{!links[1]?null:links[0]}</a>);
  return (
    <div className={style.user}>
      <div className={style.avatar}>
        <img src={props.photos.small??defaultAvatar} alt=''/>
      </div>
      <div className={style.body}>
        <div className={style.name}>{props.fullName}</div>
        <div className={style.about}>About me: {props.aboutMe}</div>
        <div className={style.contacts}>
          <div className={style.contacts_title}>Contacts:</div>
          <div className={style.links}>
            {getLinks}
          </div>
        </div>
      </div>
    </div>
  );
} 

export default User;