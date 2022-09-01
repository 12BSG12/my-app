import Users from './Users';
import { getUsersAsyncThunk, changePageAsyncThunk, unFollowAsyncThunk, followAsyncThunk } from '../../redux/reducers/users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const UsersContainer = () => {
  const {usersData, pageSize, totalCount, currentPage, isFetching, isFriends, search} = useAppSelector(state => state.usersPage);

  let dispatch = useAppDispatch();

  useEffect(() =>{
    dispatch(getUsersAsyncThunk({currentPage, pageSize, isFriends, search}))
  }, [dispatch, currentPage, pageSize, isFriends, search]);

  const changePage = (currentPage: number) => {
    dispatch(changePageAsyncThunk({currentPage, pageSize}))
  };

  const unFollow = (id: number) => dispatch(unFollowAsyncThunk(id));

  const follow = (id: number) => dispatch(followAsyncThunk(id));

  let pagesCount = Math.ceil(totalCount / pageSize);
  return(
    <>
      {isFetching ? <Preloader /> : <Users  
      follow={follow}
      unFollow={unFollow}
      pagesCount={pagesCount}
      changePage={changePage}
      {...{usersData, currentPage}}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
