import style from './User.module.css';

const User = () => {
  return (
    <div className={style.user}>
      <div className={style.avatar}>
        <img src="https://via.placeholder.com/150"/>
      </div>
      <div className={style.body}>
        <div className={style.name}>Vadim G.</div>
        <div className={style.birth}>Date of birth: 28 march</div>
        <div className={style.city}>City: Osa</div>
        <div className={style.education}>Education: -</div>
        <div className={style.web}>Site: <a href='#'>https://4eta-tam.com</a></div>
      </div>
    </div>
  );
} 

export default User;