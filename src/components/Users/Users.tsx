import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { _IUsers } from './IUsers';
import SearchForm from './SearchForm';

const Users: FC<_IUsers> = ({usersData, follow, unFollow, changePage, pagesCount, usersPageQuery}) => {
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
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.title}>Users</div>
        <SearchForm />
        <div className={style.users}>
          {getUsers}
        </div>
        <Stack spacing={2}>
          <Pagination count={pagesCount} color="primary" showFirstButton showLastButton page={Number(usersPageQuery)} onChange={(_, num) => changePage(num)} />
        </Stack>
      </div>
    </div>
  )
} 

export default Users;
