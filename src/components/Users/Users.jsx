import * as axios from 'axios';
import User from './User';
import style from './Users.module.css';
import defaultAvatar from '../../assets/images/default_avatar.webp';

const Users = (props) => {

  if(props.usersData.length === 0){
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>{
      props.setUsers(response.data.items)
    });
  }
  const addUsers = () => {
    props.setUsers([
      {id: 1, photoUrl:'https://via.placeholder.com/50', name: 'Egor D.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: true},
      {id: 2, photoUrl:'https://via.placeholder.com/50', name: 'Dima S.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: false},
      {id: 3, photoUrl:'https://via.placeholder.com/50', name: 'Vadim G.', location: {counrty: 'Russia', city: 'Osa'}, status:'I`am dump', followed: true},
      {id: 4, photoUrl:'https://via.placeholder.com/50', name: 'Alex W.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: false},
    ]);
  }
  const getUsers = props.usersData.map(user => <User 
    id={user.id}
    // photo={user.photoUrl}
    photos={user.photos.small??defaultAvatar}
    name={user.name} 
    key={user.id} 
    // counrty={user.location.counrty}
    // city={user.location.city}
    status={user.status}
    followed ={user.followed}
    follow={props.follow}
    unFollow={props.unFollow}
  />);
  return (
    <div className={style.body}>
      <div className={style.title}>Users</div>
      <div className={style.users}>
        {getUsers}
      </div>
      <button className={style.bigbtn} onClick={addUsers}>Show more</button>
    </div>
  );
} 

export default Users;
