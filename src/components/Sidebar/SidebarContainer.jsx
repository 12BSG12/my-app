import Sidebar from './Sidebar';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFriendsAsyncThunk} from '../../redux/reducers/sidebar'

const SidebarContainer = () => {
  let friendsData = useSelector(state => state.sidebar.friendsData);
  let count = useSelector(state => state.sidebar.count);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriendsAsyncThunk(count))
  }, [dispatch, count])
  
  return <Sidebar friendsData={friendsData}/>
}

export default SidebarContainer;
