import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Users = ({usersData, follow, unFollow, followindInProgress, pagesCount, setPage, page}) => {
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
      <Stack spacing={2}>
        <Pagination count={pagesCount} color="primary" showFirstButton showLastButton page={page} onChange={(_, num) => setPage(num)} />
      </Stack>
      <div className={style.users}>
        {getUsers}
      </div>
    </div>
  )
} 

export default Users;
