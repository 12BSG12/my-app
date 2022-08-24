import { usersAPI } from '../api/api';
import defaultAvatar from '../assets/images/default_avatar.webp';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const SET_USER_FULL_NAME = 'SET_USER_FULL_NAME';
const SET_CAPTACHA = 'SET_CAPTACHA';
const SET_ERROR = 'SET_ERROR';

let initialState = {
  id: null,
  fullName: null,
  isAuth: false,
  photo: null,
  captchaURL: null,
  messageError: null
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
    case SET_USER_FULL_NAME:
      return {
        ...state, 
        fullName: action.name
      };
    case SET_CAPTACHA:
      return {
        ...state, 
        captchaURL: action.captcha
      };
    case SET_ERROR:
      return {
        ...state, 
        messageError: action.error
      };
    default:
      return state;
  }
};

const setUserData = (id, fullName, isAuth, photo) => ({
  type: SET_USER_DATA,
  data: {
    id,
    fullName,
    isAuth,
    photo
  }
});

export const setUserPhoto = (photo) => ({
  type: SET_USER_PHOTO,
  photo
});

export const setUserFullName = (name) => ({
  type: SET_USER_FULL_NAME,
  name
});

const setCaptcha = (captcha) => ({
  type: SET_CAPTACHA,
  captcha
});

const stopSubmit = (error) => ({
  type: SET_ERROR,
  error
});

export const getUserDataThunkCreator = () => async (dispatch) =>{
  let dataAuth = await usersAPI.auth.getAuth()
  if(dataAuth.resultCode === 0){
    let {id} = dataAuth.data;
    let dataProfile = await usersAPI.profile.getProfile(id);
    let photo = dataProfile.photos.small??defaultAvatar;
    dispatch(setUserData(id, dataProfile.fullName, true, photo));
  }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response =  await usersAPI.auth.postLogin(email, password, rememberMe, captcha);
  switch (response.data.resultCode) {
    case 0:
      dispatch(getUserDataThunkCreator());
      break;
    case 1:
      let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit(error))
      break;
    case 10:
      dispatch(getCaptcha())
    break;
    default:
      break;
  }
}

export const logOutThunkCreator = () => async (dispatch) =>{
  let response = await usersAPI.auth.deleteLogOut();
  if(response.data.resultCode === 0){
    dispatch(setUserData(null, null, false, null));
    dispatch(setCaptcha(null));
    dispatch(stopSubmit(null));
  }
}

const getCaptcha = () => async (dispatch) =>{
  let data = await usersAPI.security.getCaptcha();
  dispatch(setCaptcha(data.url));
}

export default authReducer;