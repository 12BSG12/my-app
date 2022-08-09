import Users from './Users';
import { connect } from 'react-redux'

const mapStateToProps = (state) =>({
  usersData: state.usersPage.usersData
});

const UsersContainer = connect(mapStateToProps)(Users);
export default UsersContainer;
