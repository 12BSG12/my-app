import Users from './Users';
import { connect } from 'react-redux'
import {
  followActionCreator, 
  unFollowActionCreator, 
  setUsersActionCreator,
  setPageSizeActionCreator, 
  setTotalCountActionCreator,
  setCurrentPageActionCreator } from '../../redux/users-reducer';


const mapStateToProps = (state) =>({
  usersData: state.usersPage.usersData,
  pageSize: state.usersPage.pageSize,
  totalCount: state.usersPage.totalCount,
  currentPage: state.usersPage.currentPage
});
const mapDispatchToProps = (dispatch) =>({
  follow: (id) => {dispatch(followActionCreator(id));},
  unFollow: (id) => {dispatch(unFollowActionCreator(id));},
  setUsers: (users) => {dispatch(setUsersActionCreator(users));},
  setPageSize: (count) => {dispatch(setPageSizeActionCreator(count));},
  setTotalCount: (count) => {dispatch(setTotalCountActionCreator(count));},
  setCurrentPage: (count) => {dispatch(setCurrentPageActionCreator(count));}
});
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
