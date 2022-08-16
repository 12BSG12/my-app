const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  dialogsData: [
    {id:1, name:'Vadim'},
    {id:2, name:'Andrew'},
  ],
  messagesData: [
    {id:1, message:'shhhsgh shh'},
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state, 
        messagesData: [...state.messagesData, {id: 3, message: action.message}],
      };
    default:
      return state;
  }
};

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
});

export default dialogsReducer;