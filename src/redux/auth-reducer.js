import { usersAPI } from '../api/api';
import defaultAvatar from '../assets/images/default_avatar.webp';

const SET_USER_DATA = 'SET_USER_DATA';

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

export const setUserDataThunkCreator = () => (dispatch) =>{
  usersAPI.auth.getAuth().then(data => {
    if(data.resultCode === 0){
      let {id, email, login} = data.data;
      usersAPI.profile.getProfile(id).then(data =>  {
        let photo = data.photos.small??defaultAvatar;
        dispatch(setUserData(id, email, login, true, photo));
      });
    }
  });
}

export const loginThunkCreator = (email, password, rememberMe) => (dispatch) =>{
  usersAPI.auth.postLogin(email, password, rememberMe).then(response => {
    if(response.data.resultCode === 0){
      dispatch(setUserDataThunkCreator());
    }
  });
}

export const logOutThunkCreator = () => (dispatch) =>{
  usersAPI.auth.deleteLogOut().then(response => {
    if(response.data.resultCode === 0){
      dispatch(setUserData(null, null, null, false, null));
    }
  });
}

export default authReducer;