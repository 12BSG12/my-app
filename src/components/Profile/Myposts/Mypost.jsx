import React from 'react';
import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = (props) => {
  const getPost = props.postData.map(post => <Post message={post.message} likesCount={post.likesCount}/>); 
  const message = React.createRef();
  const onPostChange = () => {
    let text = message.current.value;
    props.updateNewPostText(text)
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
          <textarea className={style.textarea} ref={message} onChange={onPostChange} value={props.newPostText} placeholder="your news..."/>
          <button className={style.btn} onClick={onAddPost} type="Send">Send</button> 
      </div>
      <div className={style.posts}>
        {getPost}
      </div>
    </div>
  );
} 

export default Mypost;