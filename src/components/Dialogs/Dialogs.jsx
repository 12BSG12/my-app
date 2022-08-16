import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogsReduxForm from './DialogsForm';

const Dialogs = (props) => {
  const getDialogs = props.dialogsData.map((dialog, i) => <User username={dialog.name} key={i} id={dialog.id}/>);
  const getMassage = props.messagesData.map((message,i) => <Message message={message.message} id={message.id} key={i}/>);
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
          <DialogsReduxForm onSubmit={props.onSubmit}/>
        </div>
      </div>
    </div>
  );
} 

export default Dialogs;
