import Users from './Users';
import {Component} from 'react';
import { connect } from 'react-redux'
import { getUsersThunkCreator, changePageThunkCreator, unFollowThunkCreator, followThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

class UsersContainer extends Component { 
  componentDidMount(){
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
  };

  changePage = (page) => this.props.changePageThunkCreator(page, this.props.pageSize);

  unFollow = (id) => this.props.unFollowThunkCreator(id);

  follow = (id) => this.props.followThunkCreator(id);
  
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
  isFetching: state.usersPage.isFetching,
  followindInProgress: state.usersPage.followindInProgress
});

export default connect(mapStateToProps, { getUsersThunkCreator, changePageThunkCreator, unFollowThunkCreator, followThunkCreator })(withAuthNavigate(UsersContainer));
