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
        <Post message='Hey, why nobdy love me?'/>
        <Post message='It`s our new program! Hey!'/>
      </div>
    </div>
  );
} 

export default Mypost;