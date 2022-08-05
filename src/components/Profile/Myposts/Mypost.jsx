import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = () => {
  let postData = [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
  ];
  const getPost = postData.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

  return (
    <div>
      <form className={style.form}>
          <label className={style.title}>My posts</label>
          <textarea className={style.textarea} placeholder="your news..."></textarea>
          <button className={style.btn} type="Send">Send</button>
      </form>
      <div className={style.posts}>{
        getPost
      }
      </div>
    </div>
  );
} 

export default Mypost;