import Users from './Users';
import {Component} from 'react';
import { connect } from 'react-redux'
import { follow, 
  unFollow, 
  setUsers,
  setPageSize, 
  setTotalCount,
  setCurrentPage,
  togglefollowindProgress } from '../../redux/users-reducer';
import {toggleFetchingPage} from '../../redux/preloader-reducer'
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

class UsersContainer extends Component { 
  componentDidMount(){
    this.props.toggleFetchingPage(true);
    usersAPI.users.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
      this.props.toggleFetchingPage(false);
      this.props.setUsers(data.items)
      this.props.setTotalCount(data.totalCount)
    });
  };

  changePage = (page) => {
    this.props.setCurrentPage(page);
    this.props.toggleFetchingPage(true);
    usersAPI.users.getUsers(page, this.props.pageSize).then(data => {
      this.props.toggleFetchingPage(false);
      this.props.setUsers(data.items)
    });
  }

  unFollow = (id) => {
    this.props.togglefollowindProgress(id, true);
    usersAPI.follow.deleteFollow(id).then(data => {
      if(data.resultCode === 0){
        this.props.unFollow(id)
      }
      this.props.togglefollowindProgress(id, false);
    });
  }

  follow = (id) => {
    this.props.togglefollowindProgress(id, true);
    usersAPI.follow.postFollow(id).then(data => {
      if(data.resultCode === 0){
        this.props.follow(id)
      }
      this.props.togglefollowindProgress(id, false);
    });
  }
  
  render(){
    let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
    let pagesArray = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesArray.push(i);
    }

    //Эффект карусели
    let curP = this.props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5;
    let curPL = curP + 4;
    let slicedPages = pagesArray.slice( curPF, curPL);
    const {usersData, currentPage, isFetching, followindInProgress} = this.props
    return(
      <>
        {this.props.isFetching ? <Preloader /> : <Users  
        follow={this.follow}
        unFollow={this.unFollow}
        slicedPages={slicedPages}
        changePage={this.changePage}
        {...{usersData, currentPage, isFetching, followindInProgress}}
        />}
      </>
    );
  }
} 

const mapStateToProps = (state) =>({
  usersData: state.usersPage.usersData,
  pageSize: state.usersPage.pageSize,
  totalCount: state.usersPage.totalCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.preloader.isFetching,
  followindInProgress: state.usersPage.followindInProgress
});

export default connect(mapStateToProps, { follow, unFollow, setUsers, setPageSize, setTotalCount, setCurrentPage, toggleFetchingPage, togglefollowindProgress })(UsersContainer);
