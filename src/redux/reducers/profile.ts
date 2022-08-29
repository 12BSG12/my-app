import { usersAPI } from '../../api/api';
import { setUserPhoto, setUserFullName } from './auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setUserProfileAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'profilePage/setUserProfileAsyncThunk',
  async (userID, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.getProfile(userID);
      dispatch(setUserProfile(data));
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const setProfilePhotoAsyncThunk = createAsyncThunk<undefined, any, {rejectValue: string}>(
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
      return rejectWithValue('Server Error!')
    }
  }
)

export const setProfileEditAsyncThunk = createAsyncThunk<undefined, userType, {rejectValue: string}>(
  'profilePage/setProfileEditAsyncThunk',
  async (formData, {rejectWithValue, dispatch}) => {  
    try {
      let obj = {
        aboutMe: formData.aboutMe,
        contacts: {
          facebook: formData.contacts?.facebook || null,
          website: formData.contacts?.website || null,
          vk: formData.contacts?.vk || null,
          twitter: formData.contacts?.twitter || null,
          instagram: formData.contacts?.instagram || null,
          youtube: formData.contacts?.youtube || null,
          github: formData.contacts?.github || null,
          mainLink: formData.contacts?.mainLink || null
        },
        lookingForAJob: formData.lookingForAJob,
        lookingForAJobDescription: formData.lookingForAJobDescription,
        fullName: formData.fullName,
      }
      let data = await usersAPI.profile.putProfileEdit(obj);
      if(data.resultCode === 0){
        dispatch(setUserProfileEdit(obj))
        dispatch(setUserFullName(obj.fullName));
      }
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const setProfileStatusAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'profilePage/setProfileStatusAsyncThunk',
  async (userID, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.getProfileStatus(userID);
      dispatch(setUserProfileStatus(data));
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const updateProfileStatusAsyncThunk = createAsyncThunk<undefined, string, {rejectValue: string}>(
  'profilePage/updateProfileStatusAsyncThunk',
  async (status, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.profile.putProfileStatus(status);
      if(data.resultCode === 0){
        dispatch(setUserProfileStatus(status));
      }
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export type userType = {
  aboutMe: string | null | undefined
  contacts?: {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
  },
  lookingForAJob: boolean,
  lookingForAJobDescription: string | null,
  fullName: string,
  userId?: number | null,
  photos?: {
    small: string | null,
    large: string | null
  }
}

export type postType = {
  id: number
  message: string,
  likesCount: number
}

export type profileState = {
  userProfileData: userType | null
  postData: postType[]
  isFetching?: boolean
  profileStatus: string
}

const initialState: profileState = {
  userProfileData: null,
  postData: [
    {id: 1, message:'Hey, why nobdy love me?', likesCount: 12},
    {id: 2, message:'It`s our new program! Hey!', likesCount: 24},
  ],
  isFetching: false,
  profileStatus: '',
}

const profileReducer = createSlice({
  name: 'profilePage',
  initialState,
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
      if (state.userProfileData !== null) {
        state.userProfileData.photos = action.payload
      }
    },
    setUserProfileEdit (state, action) {
      state.userProfileData = {...state.userProfileData, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserProfileAsyncThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(setUserProfileAsyncThunk.fulfilled, (state) => {
        state.isFetching = false
      })
  },
})

export const { addPost, deletePost, 
  setUserProfilePhoto, setUserProfileStatus, 
  setUserProfileEdit, setUserProfile } = profileReducer.actions
export default profileReducer.reducer