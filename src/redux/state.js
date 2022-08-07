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
  _callsubscriber(){},
  getState(){return this._state},
  subscribe(observer) { this._callsubscriber = observer },
  _addPost() {
    this._state.profilePage.postData.push({id: 3, message: this._state.profilePage.newPostText, likesCount: 24});
    this._state.profilePage.newPostText = '';
    this._callsubscriber();
  },
  _upadtePostText(text) {
    this._state.profilePage.newPostText = text;
    this._callsubscriber();
  },
  dispatch(action){
    switch (action.type) {
      case 'ADD-POST':
        this._addPost();
        break;
      case 'UPADTE-POST-TEXT':
        this._upadtePostText(action.text)
        break;
      default:
        break;
    }
  },
}
export default store;