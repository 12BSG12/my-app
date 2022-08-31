import { usersAPI } from '../../api/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IFriends, sidebarType } from '../../models/sidebarType';


export const getFriendsAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'sidebar/getFriendsAsyncThunk',
  async (totalCount, {rejectWithValue, dispatch}) => {
    try {
      let count = await usersAPI.users.getFriends();
      dispatch(getCount(count.totalCount));
      let data = await usersAPI.users.getFriends(totalCount)
      dispatch(getFriends(data.items));
    } catch (error) {
      return rejectWithValue('Server Error!')
    }
  }
)

const initialState: sidebarType = {
  friendsData: [],
  count: 0,
  isLoading: false,
  error: null
}

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    getFriends (state, action: PayloadAction<IFriends[]>) {
      state.friendsData = action.payload;
    },
    getCount (state, action: PayloadAction<number>) {
      state.count =  action.payload;
    },
    delFriends (state, action: PayloadAction<number>) {
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