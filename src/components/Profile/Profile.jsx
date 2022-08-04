import Mypost from './Myposts/Mypost';
import User from './User/User';
import Header from './Header/Header';
import style from './Profile.module.css';

const Content = () => {
  return (
    <main>
      <Header />
      <User />
      <Mypost />
    </main>
  );
}

export default Content;