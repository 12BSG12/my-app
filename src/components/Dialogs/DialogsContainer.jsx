import Dialogs from './Dialogs';
import {updateMessageActionCreator, sendMessageActionCreator} from '../../redux/dialogs-reducer';
import { useDispatch, useSelector } from 'react-redux'

const DialogsContainer = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.dialogsPage);
  const handleMessageChange = (text) => {
    dispatch(updateMessageActionCreator(text));
  };
  const sendMessage = () => {
    dispatch(sendMessageActionCreator());
  };
  return <Dialogs updateMessageText={handleMessageChange} sendMessage={sendMessage} {...state}/>
} 

export default DialogsContainer;
