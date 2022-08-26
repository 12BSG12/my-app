import { usersAPI } from '../../api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { delFriends, addFriends } from './sidebar'

const updataObjectInArray = (item, objPropName, actionProp, newObjProps) => item.map(user => (user[objPropName] === actionProp) ? {...user, ...newObjProps}: user);
const followed = async (id, dispatch, api, actionCr) => {
  dispatch(togglefollowindProgress(id, true));
  let data = await api(id);
  if(data.resultCode === 0){
    dispatch(actionCr(id))
  }
  dispatch(togglefollowindProgress(id, false));
} 

export const getUsersAsyncThunk = createAsyncThunk(
  'usersPage/getUsersAsyncThunk',
  async ({currentPage, pageSize}, {rejectWithValue, dispatch}) => {
    try {
      let data = await usersAPI.users.getUsers(currentPage, pageSize);
      dispatch(setUsers(data.items))
      dispatch(setTotalCount(data.totalCount))
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)

export const changePageAsyncThunk   = createAsyncThunk(
  'usersPage/changePageAsyncThunk',
  async ({page, pageSize}, {rejectWithValue, dispatch}) => {
    try {
      dispatch(setCurrentPage(page));
      let data = await usersAPI.users.getUsers(page, pageSize);
      dispatch(setUsers(data.items))
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)

export const unFollowAsyncThunk  = createAsyncThunk(
  'usersPage/unFollowAsyncThunk',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await followed(id, dispatch, usersAPI.follow.deleteFollow, unFollow);
      dispatch(delFriends(id));
    } catch(error){
      return rejectWithValue(error)
    }
  }
)

export const followAsyncThunk  = createAsyncThunk(
  'usersPage/followAsyncThunk',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await followed(id, dispatch, usersAPI.follow.postFollow, follow);
      dispatch(addFriends());
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)

const usersReducer = createSlice({
  name: 'usersPage',
  initialState: {
    usersData: [],
    pageSize: 4,
    totalCount: 0,
    currentPage: 1,
    followindInProgress: [],
    isFetching: false
  },
  reducers: {
    follow (state, action) {
      state.usersData = updataObjectInArray(state.usersData, "id", action.payload, {followed: true})
    },
    unFollow (state, action) {
      state.usersData = updataObjectInArray(state.usersData, "id", action.payload, {followed: false})
    },
    setUsers (state, action) {
      state.usersData = action.payload
    },
    setTotalCount (state, action) {
      state.totalCount = action.payload
    },
    setCurrentPage (state, action) {
      state.currentPage = action.payload
    },
    togglefollowindProgress (state, action) {
      const { boolean, id } = action.payload;
      state.followindInProgress = boolean
      ? state.followindInProgress.push(id)
      : state.followindInProgress.filter(_id => _id !== id)
    }
  },
  extraReducers: {
    [getUsersAsyncThunk.pending]: (state) => {
      state.isFetching = true
    },
    [getUsersAsyncThunk.fulfilled]: (state) => {
      state.isFetching = false
    },
    [changePageAsyncThunk.pending]: (state) => {
      state.isFetching = true
    },
    [changePageAsyncThunk.fulfilled]: (state) => {
      state.isFetching = false
    }
  }
});

export const { follow, unFollow, setUsers, setTotalCount, setCurrentPage, togglefollowindProgress } = usersReducer.actions
export default usersReducer.reducer