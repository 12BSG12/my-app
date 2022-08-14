import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = (props) => {
  const getPost = props.postData.map((post,i) => <Post message={post.message} key={i} likesCount={post.likesCount}/>); 
  return (
    <div>
      <div className={style.form}>
          <label className={style.title}>My posts</label>
          <textarea className={style.textarea} onChange={props.onPostChange} value={props.newPostText} placeholder="your news..."/>
          <button className={style.btn} onClick={props.onAddPost} type="Send">Send</button> 
      </div>
      <div className={style.posts}>
        {getPost}
      </div>
    </div>
  );
} 

export default Mypost;