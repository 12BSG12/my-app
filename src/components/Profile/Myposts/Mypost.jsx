import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = (props) => {
  const getPost = props.postData.map(post => <Post message={post.message} key={post.id} likesCount={post.likesCount}/>); 
  const onPostChange = (e) => {
    let text = e.target.value;
    props.upadatePostText(text)
  };
  const onAddPost = () => {
    if(props.newPostText !== ''){
      props.addPost();
    }
    else
      alert('Введите текст поста')
  };
  return (
    <div>
      <div className={style.form}>
          <label className={style.title}>My posts</label>
          <textarea className={style.textarea} onChange={onPostChange} value={props.newPostText} placeholder="your news..."/>
          <button className={style.btn} onClick={onAddPost} type="Send">Send</button> 
      </div>
      <div className={style.posts}>
        {getPost}
      </div>
    </div>
  );
} 

export default Mypost;