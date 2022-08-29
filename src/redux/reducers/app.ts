import {getUserDataAsyncThunk} from './auth'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setInitializedAsyncThunk = createAsyncThunk<undefined, void, {rejectValue: string}>(
  'app/setInitializedAsyncThunk',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      let promise = dispatch(getUserDataAsyncThunk());
      Promise.all([promise]).then(() => {
        dispatch(setInitialized());
      }); 
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

type state = {
  initialized: boolean;
}

const initialState: state = {
  initialized: false
}

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized (state) {
      state.initialized = true
    }
  }
})

export const {setInitialized} = appReducer.actions
export default appReducer.reducer