import * as axios from 'axios';
import Users from './Users';
import {Component} from 'react';
import { connect } from 'react-redux'
import { follow, 
  unFollow, 
  setUsers,
  setPageSize, 
  setTotalCount,
  setCurrentPage } from '../../redux/users-reducer';
import {toggleFetchingPage} from '../../redux/preloader-reducer'
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends Component { 
  componentDidMount(){
    this.props.toggleFetchingPage(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true}).then(response =>{
      this.props.toggleFetchingPage(false);
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    });
  };

  changePage = (page) => {
    this.props.setCurrentPage(page);
    this.props.toggleFetchingPage(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {withCredentials: true}).then(response =>{
      this.props.toggleFetchingPage(false);
      this.props.setUsers(response.data.items)
    });
  }
  unFollow = (id) => {
    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,{withCredentials: true, headers: {"API-KEY": "b70a55a4-db73-443c-bf0e-a8fca4d11491"}},).then(response =>{
      if(response.data.resultCode === 0){
        this.props.unFollow(id)
      }
    });
  }
  follow = (id) => {
    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,{},{withCredentials: true, headers: {"API-KEY": "b70a55a4-db73-443c-bf0e-a8fca4d11491"}},).then(response =>{
      if(response.data.resultCode === 0){
        this.props.follow(id)
      }
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

    return(
      <>
        {this.props.isFetching ? <Preloader /> : <Users  
        usersData={this.props.usersData}
        follow={this.follow}
        unFollow={this.unFollow}
        slicedPages={slicedPages}
        changePage={this.changePage}
        currentPage={this.props.currentPage}
        isFetching={this.props.isFetching}
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
});

// const mapDispatchToProps = (dispatch) =>({
//   follow: (id) => {dispatch(followActionCreator(id));},
//   unFollow: (id) => {dispatch(unFollowActionCreator(id));},
//   setUsers: (users) => {dispatch(setUsersActionCreator(users));},
//   setPageSize: (count) => {dispatch(setPageSizeActionCreator(count));},
//   setTotalCount: (count) => {dispatch(setTotalCountActionCreator(count));},
//   setCurrentPage: (count) => {dispatch(setCurrentPageActionCreator(count));},
//   toggleFetchingPage: (boolean) => {dispatch(toggleFetchingActionCreator(boolean));},
// });

export default connect(mapStateToProps, { follow, unFollow, setUsers, setPageSize, setTotalCount, setCurrentPage, toggleFetchingPage })(UsersContainer);
