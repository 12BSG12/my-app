import style from './Post.module.css';

const Post = (props) => {
  return (
    <div className={style.item}>
      <img className={style.avatar} src="https://via.placeholder.com/50" alt=''/>
      <div className={style.text}>{props.message}</div>
      <div className={style.likes}>like {props.likesCount}</div>
    </div>
  );
} 

export default Post;