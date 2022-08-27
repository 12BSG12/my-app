import Users from './Users';
import { getUsersAsyncThunk, changePageAsyncThunk, unFollowAsyncThunk, followAsyncThunk } from '../../redux/reducers/users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { getUsers, getPage, getTotalCount, getCurrentPage, getIsFetching, getFollowind } from '../../redux/selectors/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery, usePostFollowMutation } from '../../redux'
import { useState } from 'react'

const UsersContainer = () => {
  // let usersData = useSelector(state => getUsers(state));
  // let pageSize = useSelector(state => getPage(state));
  // let totalCount = useSelector(state => getTotalCount(state));
  // let currentPage = useSelector(state => getCurrentPage(state));
  // let isFetching = useSelector(state => getIsFetching(state));
  let followindInProgress = useSelector(state => getFollowind(state));
  
  let dispatch = useDispatch();

  // useEffect(() =>{
  //   dispatch(getUsersAsyncThunk({currentPage, pageSize}))
  // }, [dispatch, currentPage, pageSize]);

  // const changePage = (page) => dispatch(changePageAsyncThunk({page, pageSize}));

  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching} = useGetUsersQuery(page)
  const [follow] = usePostFollowMutation()

  const unFollow = (id) => dispatch(unFollowAsyncThunk(id));
  // const follow = (id) => dispatch(followAsyncThunk(id));
  const handleFollow = async (id) => await follow(id).unwrap();

  let pagesCount = Math.ceil(data?.totalCount / 10);
  return(
    <>
      {isLoading || isFetching ? <Preloader /> : <Users  
      follow={handleFollow}
      unFollow={unFollow}
      pagesCount={pagesCount}
      page={page}
      usersData={data?.usersData??[]}
      isLoading={isLoading}
      followindInProgress={followindInProgress}
      setPage={setPage}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
