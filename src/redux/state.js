import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

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
  dispatch(action){
    profileReducer(this._state.profilePage, action);
    dialogsReducer(this._state.dialogsPage, action);
    this._callsubscriber();
  },
}

export default store;