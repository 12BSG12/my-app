import { usersAPI } from '../../api/api';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUserDataAsyncThunk = createAsyncThunk(
  'auth/getUserDataAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let dataAuth = await usersAPI.auth.getAuth()
      if(dataAuth.resultCode === 0){
        let {id} = dataAuth.data;
        let dataProfile = await usersAPI.profile.getProfile(id);
        let photo = dataProfile.photos.small??defaultAvatar;
        dispatch(setUserData({id, fullName: dataProfile.fullName, isAuth: true, photo}));
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const loginAsyncThunk = createAsyncThunk(
  'auth/loginAsyncThunk',
  async ({email, password, rememberMe, captcha}, {rejectWithValue, dispatch}) => {
    try {
      let response =  await usersAPI.auth.postLogin(email, password, rememberMe, captcha);
      switch (response.data.resultCode) {
        case 0:
          dispatch(getUserDataAsyncThunk());
          break;
        case 1:
          let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
          dispatch(stopSubmit(error))
          break;
        case 10:
          dispatch(getCaptchaAsyncThunk())
        break;
        default:
          break;
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logOutAsyncThunk = createAsyncThunk(
  'auth/logOutAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let response = await usersAPI.auth.deleteLogOut();
      if(response.data.resultCode === 0){
        dispatch(setUserData({id: null, fullName: null, isAuth: false, photo: null}));
        dispatch(setCaptcha(null));
        dispatch(stopSubmit(null));
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const getCaptchaAsyncThunk = createAsyncThunk(
  'auth/getCaptchaAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.security.getCaptcha();
      dispatch(setCaptcha(data.url));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    fullName: null,
    isAuth: false,
    photo: null,
    captchaURL: null,
    messageError: null
  },
  reducers: {
    setUserData (state, action) {
      const { id, fullName, isAuth, photo } = action.payload;
      state.id = id
      state.fullName = fullName
      state.isAuth = isAuth
      state.photo = photo
    },
    setUserPhoto (state, action) {
      state.photo = action.payload
    },
    setUserFullName (state, action) {
      state.fullName = action.payload
    },  
    setCaptcha (state, action) {
      state.captchaURL = action.payload
    },
    stopSubmit (state, action) {
      state.messageError = action.payload
    }
  }
});

export const { setUserPhoto, setUserFullName, stopSubmit, setCaptcha, setUserData } = authReducer.actions
export default authReducer.reducer