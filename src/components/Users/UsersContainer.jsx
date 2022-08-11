import * as axios from 'axios';
import Users from './Users';
import {Component} from 'react';
import { connect } from 'react-redux'
import { followActionCreator, 
  unFollowActionCreator, 
  setUsersActionCreator,
  setPageSizeActionCreator, 
  setTotalCountActionCreator,
  setCurrentPageActionCreator } from '../../redux/users-reducer';

class UsersContainer extends Component { 
  componentDidMount(){
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response =>{
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    });
  };

  changePage = (page) => {
    this.props.setCurrentPage(page);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response =>{
      this.props.setUsers(response.data.items)
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

    return <Users  
      usersData={this.props.usersData}
      follow={this.props.follow}
      unFollow={this.props.unFollow}
      slicedPages={slicedPages}
      changePage={this.changePage}
      currentPage={this.props.currentPage}
    />
  }
} 

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
