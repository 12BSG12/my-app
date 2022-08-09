import Sidebar from './Sidebar';
import { useSelector, connect } from 'react-redux'

const mapStateToProps = (state) =>({
  friendsData: state.sidebar.friendsData,
});

const SidebarContainer = connect(mapStateToProps)(Sidebar);
export default SidebarContainer;

// const SidebarContainer = (props) => {
//   const state = useSelector(state => state.sidebar);
//   return (
//     <Sidebar {...state}/>
//   );
// } 

// export default SidebarContainer;