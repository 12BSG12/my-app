import Dialogs from './Dialogs';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useAppSelector } from '../../hooks/hooks';

const DialogsContainer = () => {
  let {dialogsData, messagesData} = useAppSelector(state => state.dialogsPage);
  
  return <Dialogs {...{dialogsData, messagesData}}/>;
}

export default withAuthNavigate(DialogsContainer);
