import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { _IUsers } from './IUsers';

const Users: FC<_IUsers> = ({usersData, follow, unFollow, pagesCount, changePage, currentPage}) => {
  const getUsers = usersData.map(user => <User 
    id={user.id}
    photos={user.photos.small??defaultAvatar}
    name={user.name} 
    key={user.id} 
    status={user.status}
    followed ={user.followed}
    follow={follow}
    unFollow={unFollow}
  />);
  return(
    <div className={style.body}>
      <div className={style.title}>Users</div>
      <Stack spacing={2}>
        <Pagination count={pagesCount} color="primary" showFirstButton showLastButton page={currentPage} onChange={(_, num) => changePage(num)} />
      </Stack>
      <div className={style.users}>
        {getUsers}
      </div>
      <button className={style.bigbtn}>Show more</button>
    </div>
  )
} 

export default Users;