import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogsReduxForm from './DialogsForm';
import { state } from '../../redux/reducers/dialogs';
import React from 'react'

const Dialogs: React.FC<state> = ({dialogsData, messagesData}) => {
  const getDialogs = dialogsData.map((dialog, i) => <User name={dialog.name} key={i} id={dialog.id}/>);
  const getMassage = messagesData.map((message,i) => <Message message={message.message} key={i} id={message.id}/>);
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
          <DialogsReduxForm/>
        </div>
      </div>
    </div>
  );
} 

export default Dialogs;
