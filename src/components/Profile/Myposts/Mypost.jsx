import Post from './Post/Post';
import style from './Mypost.module.css';
import MyPostForm from './MypostForm';

const Mypost = ({postData}) => {
  const getPost = postData.map((post,i) => <Post message={post.message} key={i} likesCount={post.likesCount}/>); 
  return (
    <div>
      <MyPostForm />
      <div className={style.posts}>
        {getPost}
      </div>
    </div>
  );
} 

export default Mypost;