import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = () => {
  return (
    <div>
      <form className={style.form}>
          <label className={style.title}>My posts</label>
          <textarea className={style.textarea} placeholder="your news..."></textarea>
          <button className={style.btn} type="Send">Send</button>
      </form>
      <div className={style.posts}>
        <Post />
      </div>
    </div>
  );
} 

export default Mypost;