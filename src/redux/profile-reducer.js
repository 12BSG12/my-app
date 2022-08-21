import { usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_PROFILE_STATUS = 'SET-USER-PROFILE_STATUS';
const SET_USER_PROFILE_PHOTO= 'SET-USER-PROFILE_PHOTO';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING';

let initialState = {
  userProfileData : null,
  postData: [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
  ],
  isFetching: false,
  profileStatus: '',
  profilePhoto: null
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state, 
        postData: [...state.postData, {id: 3, message: action.message, likesCount: 24}], 
      }
    case DELETE_POST:
      return {
        ...state, 
        postData: [...state.postData.filter(item => item.id !== action.id)], 
      }
    case SET_USER_PROFILE:
      return {
        ...state, 
        userProfileData: action.profile,
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.boolean
      }
    case SET_USER_PROFILE_STATUS:
      return {
        ...state,
        profileStatus: action.status
      }
    case SET_USER_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: action.photo
      }
    default:
      return state;
  };
};

export const addPost = (message) => ({
  type: ADD_POST,
  message
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
});

const setUserProfile = (profile, profileStatus ='') => ({
  type: SET_USER_PROFILE,
  profile,
  profileStatus
});
const toggleFetchingPage = (boolean) => ({
  type: TOGGLE_FETCHING,
  boolean
});
const setUserProfileStatus = (status) => ({
  type: SET_USER_PROFILE_STATUS,
  status
});

const setUserProfilePhoto = (photo) => ({
  type: SET_USER_PROFILE_PHOTO,
  photo
});

export const setUserProfileThunkCreator = (userID) => async (dispatch) => {
  dispatch(toggleFetchingPage(true));
  let data = await usersAPI.profile.getProfile(userID);
  dispatch(toggleFetchingPage(false));
  dispatch(setUserProfile(data));
}

export const setProfileStatusThunkCreator = (userID) => async (dispatch)  => {
  let data = await usersAPI.profile.getProfileStatus(userID);
  dispatch(setUserProfileStatus(data));
}

export const updateProfileStatusThunkCreator = (status) => async (dispatch)  => {
  let data = await usersAPI.profile.putProfileStatus(status);
  if(data.resultCode === 0){
    dispatch(setUserProfileStatus(status));
  }
}

export const updateProfilePhotoThunkCreator = (file) => async (dispatch)  => {
  let formData = new FormData()
  formData.append('image', file)
  let data = await usersAPI.profile.putProfilePhoto(formData);
  if(data.resultCode === 0){
    dispatch(setUserProfilePhoto(data.data.photos));
  }
}

export default profileReducer;