import { usersAPI } from '../api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getFriendsAsyncThunk = createAsyncThunk(
  'sidebar/getFriendsAsyncThunk',
  async (totalCount, {rejectWithValue, dispatch}) => {
    try {
      let count = await usersAPI.users.getFriends();
      dispatch(getCount(count.totalCount));
      let data = await usersAPI.users.getFriends(totalCount);
      dispatch(getFriends(data.items));
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState: {
    friendsData: [],
    count: 0,
    status: null,
    error: null
  },
  reducers: {
    getFriends (state, action) {
      state.friendsData = action.payload;
    },
    getCount (state, action) {
      state.count =  action.payload;
    },
    delFriends (state, action) {
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload);
      state.count -= 1;
    },
    addFriends (state) {
      state.count += 1; 
    }
  },
  extraReducers: {
    [getFriendsAsyncThunk.pending]: (state) => {
      state.status = 'loading...'
      state.error = null
    },
    [getFriendsAsyncThunk.fulfilled]: (state) => {
      state.status = 'response'
    },
    [getFriendsAsyncThunk.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = sidebarReducer.actions
export default sidebarReducer.reducer