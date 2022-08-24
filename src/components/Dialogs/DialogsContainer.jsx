import Dialogs from './Dialogs';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useSelector } from "react-redux";

const DialogsContainer = () => {
  let dialogsData = useSelector(state => state.dialogsPage.dialogsData);
  let messagesData = useSelector(state => state.dialogsPage.messagesData);
  
  return <Dialogs {...{dialogsData, messagesData}}/>;
}

export default withAuthNavigate(DialogsContainer);
