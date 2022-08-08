import User from './User/User';
import Header from './Header/Header'
import MyPostContainer from './Myposts/MyPostContainer';

const Content = (props) => {
  return (
    <main>
      <Header />
      <User />
      <MyPostContainer store={props.store}/>
    </main>
  );
}

export default Content;