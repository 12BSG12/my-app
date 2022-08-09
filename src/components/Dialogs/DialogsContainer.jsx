import Dialogs from './Dialogs';
import {updateMessageActionCreator, sendMessageActionCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux'

const mapStateToProps = (state) =>({
  dialogsData: state.dialogsPage.dialogsData,
  messagesData: state.dialogsPage.messagesData,
  newMessageText: state.dialogsPage.newMessageText
});

const mapDispatchToProps = (dispatch) =>({
  updateMessageText: (text) => {dispatch(updateMessageActionCreator(text));},
  sendMessage: () => {dispatch(sendMessageActionCreator());}
});

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);
export default DialogsContainer;

// const DialogsContainer = (props) => {
//   const dispatch = useDispatch();
//   const state = useSelector(state => state.dialogsPage);
//   const handleMessageChange = (text) => {
//     dispatch(updateMessageActionCreator(text));
//   };
//   const sendMessage = () => {
//     dispatch(sendMessageActionCreator());
//   };
//   return <Dialogs updateMessageText={handleMessageChange} sendMessage={sendMessage} {...state}/>
// } 

// export default DialogsContainer;