import React from 'react';
import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = (props) => {
  const getPost = props.postData.map(post => <Post message={post.message} likesCount={post.likesCount}/>); 
  const message = React.createRef();
  const handleMessageChange = () => {
    let text = message.current.value;
    props.upadtePostText(text);
  };
  const addPost = () => {
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
          <textarea className={style.textarea} ref={message} onChange={handleMessageChange} value={props.newPostText} placeholder="your news..."/>
          <button className={style.btn} onClick={addPost} type="Send">Send</button> 
      </div>
      <div className={style.posts}>{
        getPost
      }
      </div>
    </div>
  );
} 

export default Mypost;