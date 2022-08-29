import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogsReduxForm from './DialogsForm';
import React from 'react'
import { dialogsType } from '../../models/dialogsType';

const Dialogs: React.FC<dialogsType> = ({dialogsData, messagesData}) => {
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
