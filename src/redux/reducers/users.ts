import { usersAPI } from '../../api/api';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { delFriends, addFriends } from './sidebar'
import {IFollowed, IUsers, usersType } from '../../models/usersType';
import { ResultCodeEnum } from '../../models/resultCodeEnum';

const updateObjectInArray = (item: IUsers[], objPropName: keyof IUsers, actionProp: number, newObjProps: any) => item.map(user => (user[objPropName] === actionProp) ? {...user, ...newObjProps}: user);
const followed = async (id: number, dispatch: ThunkDispatch<unknown, unknown, AnyAction>, api: (id: number) => Promise<IFollowed>, actionCr: (id: number) => AnyAction) => {
  let data = await api(id);
  if(data.resultCode === ResultCodeEnum.Success){
    dispatch(actionCr(id))
  }
}

export const getUsersAsyncThunk = createAsyncThunk<undefined, {currentPage: number, pageSize: number, isFriends?: boolean | null, search?: string}, {rejectValue: string}>(
  'usersPage/getUsersAsyncThunk',
  async ({currentPage, pageSize, isFriends, search}, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.users.getUsers(currentPage, pageSize, isFriends, search)
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
      let data = await usersAPI.users.getUsers(currentPage, pageSize);
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
  loading: false,
  isFriends: null,
  search: ''
}

const usersReducer = createSlice({
  name: 'usersPage',
  initialState,
  reducers: {
    follow (state, action: PayloadAction<number>) {
      state.usersData = updateObjectInArray(state.usersData, "id", action.payload, {followed: true})
    },
    unFollow (state, action: PayloadAction<number>) {
      state.usersData = updateObjectInArray(state.usersData, "id", action.payload, {followed: false})
    },
    setUsers (state, action: PayloadAction<IUsers[]>) {
      state.usersData = action.payload
    },
    setTotalCount (state, action: PayloadAction<number>) {
      state.totalCount = action.payload
    },
    setCurrentPage (state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setIsFriends (state, action: PayloadAction<boolean | null>) {
      state.isFriends = action.payload
    },
    setSearch (state, action: PayloadAction<string>) {
      state.search = action.payload
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

export const { follow, unFollow, setUsers, setTotalCount, setCurrentPage, setIsFriends, setSearch } = usersReducer.actions
export default usersReducer.reducer