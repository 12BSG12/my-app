export const state = {
  profilePage: {
    postData: [
      {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
      {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
    ],
    newPostText: ''
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
  }
}

let renderEntirTree;

export const addPost = () => {
  state.profilePage.postData.push({id: 3, message: state.profilePage.newPostText, likesCount: 24});
  state.profilePage.newPostText = '';
  renderEntirTree();
}

export const upadtePostText = (text) => {
  state.profilePage.newPostText = text;
  renderEntirTree();
}

export const subscribe = (observer) => renderEntirTree = observer;
