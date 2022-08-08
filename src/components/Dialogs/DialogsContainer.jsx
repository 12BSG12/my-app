import Dialogs from './Dialogs';
import {updateMessageActionCreator, sendMessageActionCreator} from '../../redux/dialogs-reducer';

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;
  const handleMessageChange = (text) => {
    props.store.dispatch(updateMessageActionCreator(text));
  };
  const sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };
  return <Dialogs updateMessageText={handleMessageChange} sendMessage={sendMessage} {...state}/>
} 

export default DialogsContainer;
