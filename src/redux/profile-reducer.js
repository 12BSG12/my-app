const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialState = {
  postData: [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
  ],
  newPostText: '',
}

const profileReducer = (state = initialState, action) => {
  const addPost = () =>{
    state.postData.push({id: 3, message: state.newPostText, likesCount: 24});
    state.newPostText = '';
  };
  const updatePostText = (text) => {
    state.newPostText = text;
  }
  switch (action.type) {
    case ADD_POST:
      addPost();
      break;
    case UPDATE_POST_TEXT:
      updatePostText(action.text)
      break;
      default:
        return state;
  };
};

export const upadatePostTextActionCreator = (text) => ({
  type: UPDATE_POST_TEXT, 
  text: text
}); 
export const addPostActionCreator = () => ({
  type: ADD_POST
}); 

export default profileReducer;