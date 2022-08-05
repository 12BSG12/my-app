import User from './User/User';
import style from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = () => {
  let dialogsData = [
    {id:1, name:'Vadim'},
    {id:2, name:'Andrew'},
  ];
  
  let messagesData = [
    {id:1, message:'shhhsgh'},
    {id:2, message:'121'},
  ];

  const getDialogs = dialogsData.map(dialog => <User username={dialog.name} id={dialog.id}/>);
  const getMassage = messagesData.map(message => <Message message={message.message} id={message.id}/>);
  
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
