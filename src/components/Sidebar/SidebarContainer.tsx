import Sidebar from './Sidebar';
import {useEffect} from 'react'
import {getFriendsAsyncThunk} from '../../redux/reducers/sidebar'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const SidebarContainer = () => {
  let friendsData = useAppSelector(state => state.sidebar.friendsData);
  let isLoading = useAppSelector(state => state.sidebar.isLoading);
  let count = useAppSelector(state => state.sidebar.count);
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFriendsAsyncThunk(count))
  }, [dispatch, count])
  
  return <Sidebar friendsData={friendsData} isLoading={isLoading}/>
}

export default SidebarContainer;
