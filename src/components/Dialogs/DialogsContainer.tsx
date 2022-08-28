import Dialogs from './Dialogs';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { useAppSelector } from '../../hooks/hooks';
import React from 'react'

const DialogsContainer = () => {
  let dialogsData = useAppSelector(state => state.dialogsPage.dialogsData);
  let messagesData = useAppSelector(state => state.dialogsPage.messagesData);
  
  return <Dialogs {...{dialogsData, messagesData}}/>;
}

export default withAuthNavigate(DialogsContainer);
