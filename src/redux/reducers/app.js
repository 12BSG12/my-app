import {getUserDataAsyncThunk} from './auth'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setInitializedAsyncThunk = createAsyncThunk(
  'app/setInitializedAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let promise = dispatch(getUserDataAsyncThunk());
      Promise.all([promise]).then(() => {
        dispatch(setInitialized());
      }); 
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const appReducer = createSlice({
  name: 'app',
  initialState: {
    initialized: false
  },
  reducers: {
    setInitialized (state) {
      state.initialized = true
    }
  }
})

export const {setInitialized} = appReducer.actions
export default appReducer.reducer