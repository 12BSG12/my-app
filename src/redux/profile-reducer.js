import { usersAPI } from '../api/api';
import { setUserPhoto } from './auth-reducer';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_PROFILE_EDIT = 'SET-USER-PROFILE-EDIT';
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
    case SET_USER_PROFILE_EDIT:
      return {
        ...state, 
        userProfileData: {...state.userProfileData, ...action.data},
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
        userProfileData: {...state.userProfileData, photos: action.photos}
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

const setUserProfilePhoto = (photos) => ({
  type: SET_USER_PROFILE_PHOTO,
  photos
});

const setUserProfileEdit = (data) => ({
  type: SET_USER_PROFILE_EDIT,
  data
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

export const setProfilePhotoThunkCreator = (file) => async (dispatch)  => {
  let formData = new FormData()
  formData.append('image', file)
  let data = await usersAPI.profile.putProfilePhoto(formData);
  if(data.resultCode === 0){
    dispatch(setUserProfilePhoto(data.data.photos));
    dispatch(setUserPhoto(data.data.photos.small))
  }
}

export const setProfileEditThunkCreator = (formData) => async (dispatch)  => {
  let obj = {
    aboutMe: formData.aboutMe,
    contacts: {
      facebook: formData.facebook,
      website: formData.website,
      vk: formData.vk,
      twitter: formData.twitter,
      instagram: formData.instagram,
      youtube: formData.youtube,
      github: formData.github,
      mainLink: formData.mainLink
    },
    lookingForAJobDescription: null,
    lookingForAJob: formData.lookingForAJob,
    fullName: formData.fullName,
    userId: 25419,
  }
  let data = await usersAPI.profile.putProfileEdit(obj);
  if(data.resultCode === 0){
    dispatch(setUserProfileEdit(obj))
  }
}

export default profileReducer;