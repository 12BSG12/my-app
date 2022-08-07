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
      ]
    },
    sidebar:{
      friendsData: [
        {id: 1, name: 'Egor'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Andrew'},
      ]
    },
  },
  getState(){return this._state},
  _callsubscriber(){},
  addPost() {
    this._state.profilePage.postData.push({id: 3, message: this._state.profilePage.newPostText, likesCount: 24});
    this._state.profilePage.newPostText = '';
    this._callsubscriber(this._state);
  },
  upadtePostText(text) {
    this._state.profilePage.newPostText = text;
    this._callsubscriber(this._state);
  },
  subscribe(observer) { this._callsubscriber = observer }
}
export default store;