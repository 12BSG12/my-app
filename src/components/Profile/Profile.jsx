import Mypost from './Myposts/Mypost';
import User from './User/User';
import Header from './Header/Header';
import style from './Profile.module.css';

const Content = () => {
  return (
    <main className={style.content}>
      <Header />
      <User />
      <Mypost />
    </main>
  );
} 

export default Content;