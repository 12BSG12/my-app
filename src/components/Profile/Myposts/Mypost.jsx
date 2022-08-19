import Post from './Post/Post';
import style from './Mypost.module.css';
import MyPostReduxForm from './MypostForm';

const Mypost = ({postData, onSubmit}) => {
  const getPost = postData.map((post,i) => <Post message={post.message} key={i} likesCount={post.likesCount}/>); 
  return (
    <div>
      <MyPostReduxForm onSubmit={onSubmit}/>
      <div className={style.posts}>
        {getPost}
      </div>
    </div>
  );
} 

export default Mypost;