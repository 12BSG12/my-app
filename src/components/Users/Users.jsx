import * as axios from 'axios';
import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import {Component} from 'react';

class Users extends Component { 
  componentDidMount(){
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response =>{
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    });
  };
  addUsers = () => {
  }
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

    const getUsers = this.props.usersData.map(user => <User 
      id={user.id}
      photos={user.photos.small??defaultAvatar}
      name={user.name} 
      key={user.id} 
      // counrty={user.location.counrty}
      // city={user.location.city}
      status={user.status}
      followed ={user.followed}
      follow={this.props.follow}
      unFollow={this.props.unFollow}
    />);
    return(
      <div className={style.body}>
        <div className={style.title}>Users</div>
        <div className={style.pages}>
          {slicedPages.map(p => <span onClick={() => this.changePage(p)} className={this.props.currentPage === p && style.p}>{p}</span>)}
        </div>
        <div className={style.users}>
          {getUsers}
        </div>
        <button className={style.bigbtn} onClick={this.addUsers}>Show more</button>
      </div>
    )
  }
} 

export default Users;
