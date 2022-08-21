import Dialogs from './Dialogs';
import {sendMessage} from '../../redux/dialogs-reducer';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useDispatch, useSelector } from "react-redux";

const DialogsContainer = () => {
  let dialogsData = useSelector(state => state.dialogsPage.dialogsData);
  let messagesData = useSelector(state => state.dialogsPage.messagesData);
  
  let dispatch = useDispatch();

  const onSubmit = (formData) => {
    dispatch(sendMessage(formData.message));
    formData.message = null;
  }
  return <Dialogs {...{dialogsData, messagesData}} onSubmit={onSubmit}/>;
}

export default withAuthNavigate(DialogsContainer);
