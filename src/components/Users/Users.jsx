import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';

const Users = ({usersData, follow, unFollow, followindInProgress, slicedPages, changePage, currentPage}) => {
  const getUsers = usersData.map(user => <User 
    id={user.id}
    photos={user.photos.small??defaultAvatar}
    name={user.name} 
    key={user.id} 
    status={user.status}
    followed ={user.followed}
    follow={follow}
    unFollow={unFollow}
    followindInProgress={followindInProgress}
  />);
  return(
    <div className={style.body}>
      <div className={style.title}>Users</div>
      <div className={style.pages}>
        {slicedPages.map(p => <span onClick={() => changePage(p)} className={currentPage === p ? style.p : ''}>{p}</span>)}
      </div>
      <div className={style.users}>
        {getUsers}
      </div>
      <button className={style.bigbtn}>Show more</button>
    </div>
  )
} 

export default Users;
