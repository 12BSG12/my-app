import Sidebar from './Sidebar';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFriendsAsyncThunk} from '../../redux/reducers/sidebar';
import { useGetFriendsQuery } from '../../redux'
import { useState } from 'react'

const SidebarContainer = () => {
  // let friendsData = useSelector(state => state.sidebar.friendsData);
  // let isLoading = useSelector(state => state.sidebar.isLoading);
  // let count = useSelector(state => state.sidebar.count);
  // let dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getFriendsAsyncThunk(count))
  // }, [dispatch, count])
  
  // return <Sidebar friendsData={friendsData} isLoading={isLoading}/>
  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching} = useGetFriendsQuery(page)
  return <Sidebar friendsData={data?.friendsData??[]} isLoading={isLoading} isFetchin={isFetching} gpaga={page} setPage={setPage} totalCount={data?.totalCount}/>
}

export default SidebarContainer;
