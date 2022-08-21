import { usersAPI } from '../api/api';
import defaultAvatar from '../assets/images/default_avatar.webp';
import { stopSubmit  } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  photo: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state, 
        ...action.data
      };
    case SET_USER_PHOTO:
      return {
        ...state, 
        photo: action.photo
      };
    default:
      return state;
  }
};

const setUserData = (id, email, login, isAuth, photo) => ({
  type: SET_USER_DATA,
  data: {
    id,
    email,
    login,
    isAuth,
    photo
  }
});

export const setUserPhoto = (photo) => ({
  type: SET_USER_PHOTO,
  photo
});

export const getUserDataThunkCreator = () => async (dispatch) =>{
  let dataAuth = await usersAPI.auth.getAuth()
  if(dataAuth.resultCode === 0){
    let {id, email, login} = dataAuth.data;
    let dataProfile = await usersAPI.profile.getProfile(id);
    let photo = dataProfile.photos.small??defaultAvatar;
    dispatch(setUserData(id, email, login, true, photo));
  }
}

export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {
  let response =  await usersAPI.auth.postLogin(email, password, rememberMe);
  if(response.data.resultCode === 0){
    dispatch(getUserDataThunkCreator());
  } else if(response.data.resultCode === 1){
    let messageErrow = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messageErrow}))
  }
}

export const logOutThunkCreator = () => async (dispatch) =>{
  let response = await usersAPI.auth.deleteLogOut();
  if(response.data.resultCode === 0){
    dispatch(setUserData(null, null, null, false, null));
  }
}

export default authReducer;