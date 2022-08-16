import { usersAPI } from '../api/api';
import defaultAvatar from '../assets/images/default_avatar.webp';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PASS = 'SET_USER_PASS';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  photo: null,
  pass: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state, 
        ...action.data,
        isAuth: true
      };
    case SET_USER_PASS:
      return {
        ...state,
        pass: action.pass
      };
    default:
      return state;
  }
};

const setUserData = (id, email, login, photo) => ({
  type: SET_USER_DATA,
  data: {
    id,
    email,
    login,
    photo
  }
});

const setUserPass = (pass) => ({
  type: SET_USER_PASS,
  pass
});

export const setUserDataThunkCreator = () => (dispatch) =>{
  usersAPI.auth.getAuth().then(data => {
    if(data.resultCode === 0){
      let {id, email, login} = data.data;
      usersAPI.profile.getProfile(id).then(data =>  {
        let photo = data.photos.small??defaultAvatar;
        dispatch(setUserData(id, email, login, photo));
      });
    }
  });
}

export const loginThunkCreator = (formData) => (dispatch) =>{
  usersAPI.auth.getLogin(formData).then(data => {
    if(data.resultCode !== 0){
      console.log(data);
      dispatch(setUserPass(formData.password));
    }
  });
}

export default authReducer;