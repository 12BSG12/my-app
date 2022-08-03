import style from './Post.module.css';

const Post = () => {
  return (
    <div className={style.item}>
      <img className={style.avatar} src="https://via.placeholder.com/50"/>
      <div className={style.text}>Hey, why nobody love me?</div>
    </div>
  );
} 

export default Post;