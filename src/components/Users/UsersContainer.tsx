import Users from './Users';
import { getUsersAsyncThunk, changePageAsyncThunk, unFollowAsyncThunk, followAsyncThunk } from '../../redux/reducers/users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';
import { IParams } from '../../models/usersType';

const UsersContainer = () => {
  const {usersData, pageSize, totalCount, isFetching} = useAppSelector(state => state.usersPage);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const usersPageQuery = searchParams.get('page') || '1';
  const usersSearchQuery = searchParams.get('term') || '';
  const usersIsFriendQuery = searchParams.get('friend') || 'null';
  
  const currentPage = Number(usersPageQuery)
  
  useEffect(() =>{
    dispatch(getUsersAsyncThunk({
        currentPage, 
        pageSize, 
        isFriends: (usersIsFriendQuery === 'null' ? null : usersIsFriendQuery === 'true' ? true : false), 
        search: usersSearchQuery}))
  }, [dispatch, pageSize, currentPage, usersIsFriendQuery, usersSearchQuery]);

  const changePage = (currentPage: number) => {
    getQuery(currentPage, usersIsFriendQuery, usersSearchQuery)
    dispatch(changePageAsyncThunk({currentPage, pageSize}))
  };
  
  const getQuery = (currentPage: number, isFriends?: string, search?: string) => {
    const params: IParams & Record<string, string | string[]> = {}
    if(isFriends !== 'null') {
      if(isFriends === 'true'){
        params.friend = 'true'
      } else {
        params.friend = 'false'
      }
    } 
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
      usersSearchQuery={usersSearchQuery}
      usersIsFriendQuery={usersIsFriendQuery}
      setSearchParams={setSearchParams}
      {...{usersData}}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
