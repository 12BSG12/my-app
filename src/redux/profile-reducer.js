import { usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING';

let initialState = {
  userProfileData : null,
  postData: [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
  ],
  newPostText: '',
  isFetching: false
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state, 
        postData: [...state.postData, {id: 3, message: state.newPostText, likesCount: 24}], 
        newPostText: ''
      }
    case UPDATE_POST_TEXT:
      return {
        ...state, 
        newPostText: action.text
      };
    case SET_USER_PROFILE:
      return {
        ...state, 
        userProfileData: action.profile
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.boolean
      }
    default:
      return state;
  };
};

export const upadatePostText = (text) => ({
  type: UPDATE_POST_TEXT, 
  text: text
}); 
export const addPost = () => ({
  type: ADD_POST
});
const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
const toggleFetchingPage = (boolean) => ({
  type: TOGGLE_FETCHING,
  boolean
});

export const setUserProfileThunkCreator = (userID) => (dispatch) => {
  dispatch(toggleFetchingPage(true));
  usersAPI.profile.getProfile(userID).then(data => {
    dispatch(toggleFetchingPage(false));
    dispatch(setUserProfile(data));
  });
}

export default profileReducer;