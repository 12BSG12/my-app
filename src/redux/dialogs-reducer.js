const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

let initialState = {
  dialogsData: [
    {id:1, name:'Vadim'},
    {id:2, name:'Andrew'},
  ],
  messagesData: [
    {id:1, message:'shhhsgh shh'},
  ],
  newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {...state, messagesData: [...state.messagesData.concat({id: 3, message: state.newMessageText})], newMessageText: ''};
    case UPDATE_MESSAGE:
      return {...state, newMessageText: action.text};
    default:
      return state;
  }
};

export const updateMessageActionCreator = (text) => ({
  type: UPDATE_MESSAGE, 
  text: text
}); 
export const sendMessageActionCreator = () => ({
  type: SEND_MESSAGE
});

export default dialogsReducer;