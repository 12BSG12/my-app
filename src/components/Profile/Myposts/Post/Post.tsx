import { FC } from 'react';
import style from './Post.module.css';

interface IPost {
  message: string
  likesCount: number
}

const Post: FC<IPost> = ({message, likesCount}) => {
  return (
    <div className={style.item}>
      <img className={style.avatar} src="https://via.placeholder.com/50" alt=''/>
      <div className={style.text}>{message}</div>
      <div className={style.likes}>like {likesCount}</div>
    </div>
  );
} 

export default Post;