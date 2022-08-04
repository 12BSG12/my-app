import style from './Post.module.css';

const Post = (props) => {
  console.log(props);
  return (
    <div className={style.item}>
      <img className={style.avatar} src="https://via.placeholder.com/50"/>
      <div className={style.text}>{props.message}</div>
    </div>
  );
} 

export default Post;