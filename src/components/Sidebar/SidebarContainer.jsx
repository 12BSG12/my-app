import Sidebar from './Sidebar';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFriendsThunkCreator} from '../../redux/sidebar-reducer'

const SidebarContainer = () => {
  let friendsData = useSelector(state => state.sidebar.friendsData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsThunkCreator())
  }, [dispatch])
  
  return <Sidebar friendsData={friendsData}/>
}

export default SidebarContainer;
