import { usersAPI } from '../../api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getFriendsAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'sidebar/getFriendsAsyncThunk',
  async (totalCount, {rejectWithValue, dispatch}) => {
    try {
      let count = await usersAPI.users.getFriends();
      dispatch(getCount(count.totalCount));
      let data = await usersAPI.users.getFriends(totalCount);
      dispatch(getFriends(data.items));
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export type friendsType = {
  id: number
  name: string
  photos: {
    small: string
    large: string
  }
}

export type state = {
  friendsData: friendsType[],
  count: number,
  isLoading: boolean,
  error: string | null |undefined
}

const initialState: state = {
  friendsData: [],
  count: 0,
  isLoading: false,
  error: null
}

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState,
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
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsAsyncThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getFriendsAsyncThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getFriendsAsyncThunk.rejected, (state, action) => {
        state.error = action.payload
      })

  },
})

export const {delFriends, addFriends, getCount, getFriends} = sidebarReducer.actions
export default sidebarReducer.reducer