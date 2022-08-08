import Sidebar from './Sidebar';

const SidebarContainer = (props) => {
  let state = props.store.getState().sidebar;
  return (
    <Sidebar {...state}/>
  );
} 

export default SidebarContainer;
