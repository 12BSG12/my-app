import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  const getDialogs = props.dialogs.map(dialog => <User username={dialog.name} id={dialog.id}/>);
  const getMassage = props.messages.map(message => <Message message={message.message} id={message.id}/>);
  
  return (
    <div>
      <div className={style.title}>Dialogs</div>
      <div className={style.container}>
        <div className={style.dialog}>
          { getDialogs }
        </div>
        <div className={style.userdialog}>
          { getMassage }
        </div>
      </div>
    </div>
  );
} 

export default Dialogs;
