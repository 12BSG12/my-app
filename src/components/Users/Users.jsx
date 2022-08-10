import * as axios from 'axios';
import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import React from 'react';

class Users extends React.Component {
   constructor(props) {
    super(props);
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>{
        this.props.setUsers(response.data.items)
    });
  } 
  addUsers = () => {
  }
  render(){
    const getUsers = this.props.usersData.map(user => <User 
      id={user.id}
      // photo={user.photoUrl}
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
        <div className={style.users}>
          {getUsers}
        </div>
        <button className={style.bigbtn} onClick={this.addUsers}>Show more</button>
      </div>
    )
  }
} 

export default Users;
