const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

const dialogsReducer = (state, action) => {
  const sendMessage = () => {
    state.messagesData.push({id: 3, message: state.newMessageText});
    state.newMessageText = '';
  };
  const updateMessage = (text) => {
    state.newMessageText = text;
  };
  switch (action.type) {
    case SEND_MESSAGE:
      sendMessage()
      break;
    case UPDATE_MESSAGE:
      updateMessage(action.text)
      break;
    default:
      return state;
  }
};

export const upadteMessageActionCreator = (text) => ({
  type: UPDATE_MESSAGE, 
  text: text
}); 
export const sendMessageActionCreator = () => ({
  type: SEND_MESSAGE
});

export default dialogsReducer;