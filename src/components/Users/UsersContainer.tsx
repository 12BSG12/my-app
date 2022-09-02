import Users from './Users';
import { getUsersAsyncThunk, changePageAsyncThunk, unFollowAsyncThunk, followAsyncThunk } from '../../redux/reducers/users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';

interface IParams {
  friend?: 'true' | 'false',
  term?: string,
  page?: string
}

const UsersContainer = () => {
  const {usersData, pageSize, totalCount, isFetching, isFriends, search} = useAppSelector(state => state.usersPage);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const usersPageQuery = searchParams.get('page') || '1';
  
  const currentPage = Number(usersPageQuery)

  useEffect(() =>{
    getQuery(currentPage, isFriends, search)
    dispatch(getUsersAsyncThunk({currentPage, pageSize, isFriends, search}))
  }, [dispatch, pageSize, currentPage, isFriends, search]);

  const changePage = (currentPage: number) => {
    getQuery(currentPage)
    dispatch(changePageAsyncThunk({currentPage, pageSize}))
  };

  const getQuery = (currentPage: number, isFriends?: boolean | null, search?: string) => {
    const params: IParams & Record<string, string | string[]> = {}
    if(isFriends !== null) params.friend = (isFriends ? 'true' : 'false')
    if(search !== '') params.term = search
    if(currentPage) params.page = String(currentPage)
    return setSearchParams(params)
  } 
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
      usersPageQuery={usersPageQuery}
      {...{usersData}}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
