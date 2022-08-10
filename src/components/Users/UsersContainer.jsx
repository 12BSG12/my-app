import Users from './Users';
import { connect } from 'react-redux'
import {followActionCreator, unFollowActionCreator, setUsersActionCreator} from '../../redux/users-reducer';


const mapStateToProps = (state) =>({
  usersData: state.usersPage.usersData
});
const mapDispatchToProps = (dispatch) =>({
  follow: (id) => {dispatch(followActionCreator(id));},
  unFollow: (id) => {dispatch(unFollowActionCreator(id));},
  setUsers: (users) => {dispatch(setUsersActionCreator(users));}
});
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
