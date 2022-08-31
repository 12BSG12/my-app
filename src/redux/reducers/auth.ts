import { usersAPI } from '../../api/api';
import defaultAvatar from '../../assets/images/default_avatar.webp';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authType } from '../../models/authType';
import { IUser } from '../../models/profileType';


interface IAuth {
  data:{
    id: number,
    email: number,
    login: number
  }
  resultCode: number
  message: string
}

export const getUserDataAsyncThunk = createAsyncThunk<undefined, void, {rejectValue: string}>(
  'auth/getUserDataAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let dataAuth = await usersAPI.auth.getAuth() as IAuth
      if(dataAuth.resultCode === 0){
        let {id} = dataAuth.data;
        let dataProfile = await usersAPI.profile.getProfile(id) as IUser;
        let photo = dataProfile.photos?.small??defaultAvatar;
        dispatch(setUserData({id, fullName: dataProfile.fullName, isAuth: true, photo}));
      }
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

interface ILogin {
  email: string,
  password: string,
  rememberMe: boolean
  captcha: string
  resultCode?: number
  messages?: string
}

export const loginAsyncThunk = createAsyncThunk<void, ILogin, {rejectValue: string}>(
  'auth/loginAsyncThunk',
  async ({email, password, rememberMe, captcha}, {rejectWithValue, dispatch}) => {
    try {
      let data =  await usersAPI.auth.postLogin(email, password, rememberMe, captcha) as ILogin;
      switch (data.resultCode) {
        case 0:
          dispatch(getUserDataAsyncThunk());
          break;
        case 1:
          let error = data.messages && data.messages.length > 0 ? data.messages[0] : 'Some error'
          dispatch(stopSubmit(error))
          break;
        case 10:
          dispatch(getCaptchaAsyncThunk())
        break;
        default:
          break;
      }
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const logOutAsyncThunk = createAsyncThunk<undefined, void, {rejectValue: string}>(
  'auth/logOutAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.auth.deleteLogOut() as {resultCode: number};
      if(data.resultCode === 0){
        dispatch(setUserData({id: null, fullName: null, isAuth: false, photo: null}));
        dispatch(setCaptcha(null));
        dispatch(stopSubmit(null));
      }
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

const getCaptchaAsyncThunk = createAsyncThunk<undefined, void, {rejectValue: string}>(
  'auth/getCaptchaAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.security.getCaptcha() as {url: string};
      dispatch(setCaptcha(data.url));
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

const initialState: authType = {
  id: null,
  fullName: null,
  isAuth: false,
  photo: null,
  captchaURL: null,
  messageError: null
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData (state, action: PayloadAction<authType>) {
      const { id, fullName, isAuth, photo } = action.payload;
      state.id = id
      state.fullName = fullName
      state.isAuth = isAuth
      state.photo = photo
    },
    setUserPhoto (state, action: PayloadAction<string>) {
      state.photo = action.payload
    },
    setUserFullName (state, action: PayloadAction<string>) {
      state.fullName = action.payload
    },  
    setCaptcha (state, action: PayloadAction<string | null>) {
      state.captchaURL = action.payload
    },
    stopSubmit (state, action: PayloadAction<string | null>) {
      state.messageError = action.payload
    }
  }
});

export const { setUserPhoto, setUserFullName, stopSubmit, setCaptcha, setUserData } = authReducer.actions
export default authReducer.reducer