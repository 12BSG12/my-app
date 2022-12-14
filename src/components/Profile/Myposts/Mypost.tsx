import Post from './Post/Post';
import style from './Mypost.module.css';
import MyPostForm from './MypostForm';
import { FC } from "react";
import { IMyPost } from './IMyPost';

const MyPost: FC<IMyPost> = ({postData}) => {
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

export default MyPost;