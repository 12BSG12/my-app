import User from './User';
import style from './Users.module.css';

const Users = (props) => {
  const getUsers = props.usersData.map(user => <User 
    name={user.name} 
    key={user.id} 
    counrty={user.counrty}
    city={user.city}
    stays={user.stays}
  />);
  return (
    <div className={style.body}>
      <div className={style.title}>Users</div>
      <div className={style.users}>
        {getUsers}
      </div>
      <button className={style.bigbtn}>Show more</button>
    </div>
  );
} 

export default Users;
