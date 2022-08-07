const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

let store = {
  _state: {
    profilePage: {
      postData: [
        {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
        {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
      ],
      newPostText: '',
    },
    dialogsPage: {
      dialogsData: [
        {id:1, name:'Vadim'},
        {id:2, name:'Andrew'},
      ],
      messagesData: [
        {id:1, message:'shhhsgh shh'},
      ],
      newMessageText: '',
    },
    sidebar:{
      friendsData: [
        {id: 1, name: 'Egor'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Andrew'},
      ]
    },
  },
  _callsubscriber(){},
  getState(){return this._state},
  subscribe(observer) { this._callsubscriber = observer },
  _addPost() {
    this._state.profilePage.postData.push({id: 3, message: this._state.profilePage.newPostText, likesCount: 24});
    this._state.profilePage.newPostText = '';
    this._callsubscriber();
  },
  _updatePostText(text) {
    this._state.profilePage.newPostText = text;
    this._callsubscriber();
  },
  _sendMessage() {
    this._state.dialogsPage.messagesData.push({id: 3, message: this._state.dialogsPage.newMessageText});
    this._state.dialogsPage.newMessageText = '';
    this._callsubscriber();
  },
  _updateMessage(text) {
    this._state.dialogsPage.newMessageText = text;
    this._callsubscriber();
  },
  dispatch(action){
    switch (action.type) {
      case ADD_POST:
        this._addPost();
        break;
      case UPDATE_POST_TEXT:
        this._updatePostText(action.text)
        break;
      case SEND_MESSAGE:
        this._sendMessage()
        break;
      case UPDATE_MESSAGE:
        this._updateMessage(action.text)
        break;
      default:
        break;
    }
  },
}

export const upadatePostTextActionCreator = (text) => ({
  type: UPDATE_POST_TEXT, 
  text: text
}); 
export const addPostActionCreator = () => ({
  type: ADD_POST
}); 

export const upadteMessageActionCreator = (text) => ({
  type: UPDATE_MESSAGE, 
  text: text
}); 
export const sendMessageActionCreator = () => ({
  type: SEND_MESSAGE
}); 

export default store;