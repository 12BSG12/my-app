import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  const getDialogs = props.dialogsData.map(dialog => <User username={dialog.name} key={dialog.id} id={dialog.id}/>);
  const getMassage = props.messagesData.map(message => <Message message={message.message} id={message.id} key={message.id}/>);
  return (
    <div>
      <div className={style.title}>Dialogs</div>
      <div className={style.container}>
        <div className={style.dialog}>
          { getDialogs }
        </div>
        <div className={style.userdialog}>
          <div className={style.message}>
            { getMassage }
          </div>
          <div className={style.body}>
            <textarea className={style.textarea} value={props.newMessageText} onChange={props.handleMessageChange} placeholder='Write a message...'/>
            <button className={style.btn} onClick={props.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default Dialogs;
