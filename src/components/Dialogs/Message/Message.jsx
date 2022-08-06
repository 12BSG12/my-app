import {useState} from 'react';
import style from './Message.module.css';

const Message = (props) => {
  const [message, setMessage] = useState('');
  const handleMessageChange = event => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    if(message !== '')
      alert(message);
    else
      alert('Введите сообщение');
  };
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.interviewer}>
          <img className={style.img} src="https://via.placeholder.com/50" alt="" />
          <div>
            <div className={style.interviewerName}>Friend</div>
            <p className={style.message}>{props.message}</p>
          </div>
        </div>
        <div className={style.my}>
          <p className={style.message}>{props.message}</p>
        </div>
      </div>
      <div className={style.body}>
        <textarea className={style.textarea} value={message} onChange={handleMessageChange} placeholder='Write a message...'/>
        <button className={style.btn} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
} 

export default Message;
