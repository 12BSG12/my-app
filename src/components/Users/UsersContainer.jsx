import Users from './Users';
import {Component} from 'react';
import { connect } from 'react-redux'
import { getUsersThunkCreator, changePageThunkCreator, unFollowThunkCreator, followThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { getUsers, getPage, getTotalCount, getCurrentPage, getIsFetching, getFollowind } from '../../redux/selectors/users';
class UsersContainer extends Component { 
  componentDidMount(){
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
  };

  changePage = (page) => this.props.changePageThunkCreator(page, this.props.pageSize);

  unFollow = (id) => this.props.unFollowThunkCreator(id);

  follow = (id) => this.props.followThunkCreator(id);
  
  render(){
    let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
    const {usersData, currentPage, isFetching, followindInProgress} = this.props
    return(
      <>
        {this.props.isFetching ? <Preloader /> : <Users  
        follow={this.follow}
        unFollow={this.unFollow}
        pagesCount={pagesCount}
        changePage={this.changePage}
        {...{usersData, currentPage, isFetching, followindInProgress}}
        />}
      </>
    );
  }
} 

const mapStateToProps = (state) =>({
  usersData: getUsers(state),
  pageSize:  getPage(state),
  totalCount: getTotalCount(state),
  currentPage:  getCurrentPage(state),
  isFetching: getIsFetching(state),
  followindInProgress: getFollowind(state)
});

export default compose(connect(mapStateToProps, { getUsersThunkCreator, changePageThunkCreator, unFollowThunkCreator, followThunkCreator }), withAuthNavigate)(UsersContainer);
