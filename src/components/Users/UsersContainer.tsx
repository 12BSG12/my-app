import Users from './Users';
import { getUsersAsyncThunk, changePageAsyncThunk, unFollowAsyncThunk, followAsyncThunk } from '../../redux/reducers/users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const UsersContainer = () => {
  const {usersData, pageSize, totalCount, currentPage, isFetching, loading, followindInProgress} = useAppSelector(state => state.usersPage);

  let dispatch = useAppDispatch();

  useEffect(() =>{
    dispatch(getUsersAsyncThunk({currentPage, pageSize}))
  }, [dispatch, currentPage, pageSize]);

  const changePage = (currentPage: number) => dispatch(changePageAsyncThunk({currentPage, pageSize}));

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
      {...{usersData, currentPage, loading, followindInProgress}}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
