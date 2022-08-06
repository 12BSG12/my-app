import {useState} from 'react';
import Post from './Post/Post';
import style from './Mypost.module.css';

const Mypost = (props) => {
  const getPost = props.postData.map(post => <Post message={post.message} likesCount={post.likesCount}/>); 
  const [message, setMessage] = useState('');
  const handleMessageChange = event => {
    setMessage(event.target.value);
  };
  const addPost = () => {
    if(message !== '')
      props.addPost(message);
    else
      alert('Введите текст поста')
  };
  return (
    <div>
      <div className={style.form}>
          <label className={style.title}>My posts</label>
          <textarea className={style.textarea} value={message} onChange={handleMessageChange} placeholder="your news..."/>
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