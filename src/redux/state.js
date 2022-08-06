export let state = {
  profilePage: {
    postData: [
      {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
      {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
    ],
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

export let addPost = (data) => {
  state.profilePage.postData.push({id: 3, message: data, likesCount: 24});
}