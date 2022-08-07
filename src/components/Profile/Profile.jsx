import Mypost from './Myposts/Mypost';
import User from './User/User';
import Header from './Header/Header'

const Content = (props) => {
  console.log(props)
  return (
    <main>
      <Header />
      <User />
      <Mypost {...props}/>
    </main>
  );
}

export default Content;