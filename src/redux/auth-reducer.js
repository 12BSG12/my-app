import { usersAPI } from '../api/api';
import defaultAvatar from '../assets/images/default_avatar.webp';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  photo: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state, 
        ...action.data,
        isAuth: true
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

export default authReducer;