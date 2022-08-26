import { usersAPI } from '../../api/api';
import { setUserPhoto, setUserFullName } from './auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setUserProfileAsyncThunk = createAsyncThunk(
  'profilePage/setUserProfileAsyncThunk',
  async (userID, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.getProfile(userID);
      dispatch(setUserProfile(data));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const setProfilePhotoAsyncThunk = createAsyncThunk(
  'profilePage/setProfilePhotoAsyncThunk',
  async (file, {rejectWithValue, dispatch}) => {
    try {
      let formData = new FormData()
      formData.append('image', file)
      let data = await usersAPI.profile.putProfilePhoto(formData);
      if(data.resultCode === 0){
        dispatch(setUserProfilePhoto(data.data.photos));
        dispatch(setUserPhoto(data.data.photos.small))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const setProfileEditAsyncThunk = createAsyncThunk(
  'profilePage/setProfileEditAsyncThunk',
  async (formData, {rejectWithValue, dispatch}) => {  
    try {
      let obj = {
        lookingForAJob: formData.lookingForAJob,
        lookingForAJobDescription: formData.lookingForAJobDescription,
        aboutMe: formData.aboutMe,
        fullName: formData.fullName || null,
        contacts: {
          github: formData.github || null,
          vk: formData.vk || null, 
          facebook: formData.facebook || null,
          instagram: formData.instagram || null,
          twitter: formData.twitter || null,
          website: formData.website || null,
          youtube: formData.youtube || null,
          mainLink: formData.mainLink || null
        },
      }
      let data = await usersAPI.profile.putProfileEdit(obj);
      if(data.resultCode === 0){
        dispatch(setUserProfileEdit(obj))
        dispatch(setUserFullName(obj.fullName));
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const setProfileStatusAsyncThunk = createAsyncThunk(
  'profilePage/setProfileStatusAsyncThunk',
  async (userID, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.getProfileStatus(userID);
      dispatch(setUserProfileStatus(data));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateProfileStatusAsyncThunk = createAsyncThunk(
  'profilePage/updateProfileStatusAsyncThunk',
  async (status, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.putProfileStatus(status);
      if(data.resultCode === 0){
        dispatch(setUserProfileStatus(status));
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const profileReducer = createSlice({
  name: 'profilePage',
  initialState: {
    userProfileData : null,
    postData: [
      {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
      {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
    ],
    isFetching: false,
    profileStatus: '',
  },
  reducers: {
    addPost (state, action) {
      state.postData.push({id: 3, message: action.payload, likesCount: 24})
    },
    deletePost (state, action) {
      state.postData = state.postData.filter(item => item.id !== action.payload)
    },
    setUserProfile (state, action) {
      state.userProfileData = action.payload
    },
    toggleFetchingPage (state, action) {
      state.isFetching = action.payload
    },
    setUserProfileStatus (state, action) {
      state.profileStatus = action.payload
    },
    setUserProfilePhoto (state, action) {
      state.userProfileData.photos = action.payload
    },
    setUserProfileEdit (state, action) {
      state.userProfileData = {...state.userProfileData, ...action.payload}
    }
  },
  extraReducers: {
    [setUserProfileAsyncThunk.pending]: (state) => {
      state.isFetching = true
    },
    [setUserProfileAsyncThunk.fulfilled]: (state) => {
      state.isFetching = false
    }
  }
})

export const { addPost, deletePost, 
  setUserProfilePhoto, setUserProfileStatus, 
  setUserProfileEdit, setUserProfile } = profileReducer.actions
export default profileReducer.reducer