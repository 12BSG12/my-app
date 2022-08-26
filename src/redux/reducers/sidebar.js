import { usersAPI } from '../../api/api';
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
    isLoading: false,
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
      state.isLoading = true
      state.error = null
    },
    [getFriendsAsyncThunk.fulfilled]: (state) => {
      state.isLoading = false
    },
    [getFriendsAsyncThunk.rejected]: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {delFriends, addFriends, getCount, getFriends} = sidebarReducer.actions
export default sidebarReducer.reducer