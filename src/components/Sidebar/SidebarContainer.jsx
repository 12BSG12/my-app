import Sidebar from './Sidebar';
import { useSelector } from 'react-redux'
const SidebarContainer = (props) => {
  const state = useSelector(state => state.sidebar);
  return (
    <Sidebar {...state}/>
  );
} 

export default SidebarContainer;
