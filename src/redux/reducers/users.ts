import { usersAPI } from '../../api/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { delFriends, addFriends } from './sidebar'
import { IUsers, usersType } from '../../models/usersType';

const updataObjectInArray = (item: IUsers[], objPropName: keyof IUsers, actionProp: number, newObjProps: any) => item.map(user => (user[objPropName] === actionProp) ? {...user, ...newObjProps}: user);
const followed = async (id: number, dispatch: any, api: any, actionCr: (id: number) => {}) => {
  let data = await api(id);
  if(data.resultCode === 0){
    dispatch(actionCr(id))
  }
} 


export const getUsersAsyncThunk = createAsyncThunk<undefined, {currentPage: number, pageSize: number}, {rejectValue: string}>(
  'usersPage/getUsersAsyncThunk',
  async ({currentPage, pageSize}, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.users.getUsers(currentPage, pageSize) as {items: IUsers[], totalCount: number};
      dispatch(setUsers(data.items))
      dispatch(setTotalCount(data.totalCount))
    } catch(error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const changePageAsyncThunk = createAsyncThunk<undefined, {currentPage: number, pageSize: number}, {rejectValue: string}>(
  'usersPage/changePageAsyncThunk',
  async ({currentPage, pageSize}, {rejectWithValue, dispatch}) => {
    try {
      dispatch(setCurrentPage(currentPage));
      let data = await usersAPI.users.getUsers(currentPage, pageSize) as {items: IUsers[]};
      dispatch(setUsers(data.items))
    } catch(error) {
      return rejectWithValue('Server Error!')
    }
  }
)

export const unFollowAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'usersPage/unFollowAsyncThunk',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await followed(id, dispatch, usersAPI.follow.deleteFollow, unFollow);
      dispatch(delFriends(id));
    } catch(error){
      return rejectWithValue('Server Error!')
    }
  }
)

export const followAsyncThunk = createAsyncThunk<undefined, number, {rejectValue: string}>(
  'usersPage/followAsyncThunk',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await followed(id, dispatch, usersAPI.follow.postFollow, follow);
      dispatch(addFriends());
    } catch(error) {
    return rejectWithValue('Server Error!')
    }
  }
)

const initialState: usersType = {
  usersData: [],
  pageSize: 4,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  loading: false
}

const usersReducer = createSlice({
  name: 'usersPage',
  initialState,
  reducers: {
    follow (state, action: PayloadAction<number>) {
      state.usersData = updataObjectInArray(state.usersData, "id", action.payload, {followed: true})
    },
    unFollow (state, action: PayloadAction<number>) {
      state.usersData = updataObjectInArray(state.usersData, "id", action.payload, {followed: false})
    },
    setUsers (state, action) {
      state.usersData = action.payload
    },
    setTotalCount (state, action: PayloadAction<number>) {
      state.totalCount = action.payload
    },
    setCurrentPage (state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsyncThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getUsersAsyncThunk.fulfilled, (state) => {
        state.isFetching = false
      })
      .addCase(changePageAsyncThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(changePageAsyncThunk.fulfilled, (state) => {
        state.isFetching = false
      })
  },
});

export const { follow, unFollow, setUsers, setTotalCount, setCurrentPage } = usersReducer.actions
export default usersReducer.reducer