import style from './Friends.module.css';
import defaultAvatar from '../../../assets/images/default_avatar.webp';

const Friends = ({name, photo}) => {
  return (
    <div className={style.item}>
        <img className={style.img} src={photo ?? defaultAvatar} alt="" />
        <div className={style.name}>{name}</div>
    </div>
  );
}

export default Friends;