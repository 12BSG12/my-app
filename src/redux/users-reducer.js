import { usersAPI } from '../api/api';
import {updataObjectInArray} from '../util/object-helpers/helpers'
import {delFriends, addFriends} from './sidebar-reducer'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS'

let initialState = {
  usersData: [],
  pageSize: 4,
  totalCount: 0,
  currentPage: 1,
  followindInProgress: [],
  isFetching: false
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state, 
        usersData: updataObjectInArray(state.usersData, "id", action.userID, {followed: true})
      };
    case UNFOLLOW:
      return {
        ...state, 
        usersData: updataObjectInArray(state.usersData, "id", action.userID, {followed: false})
      };
    case SET_USERS:
      return {
        ...state, 
        usersData: action.users
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.count
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.boolean
      }
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followindInProgress: action.boolean
        ? [...state.followindInProgress, action.id]
        : state.followindInProgress.filter(id => id !== action.id)
      }
    default:
      return state;
  }
};


const follow = (userID) => ({
  type: FOLLOW,
  userID
}); 
const unFollow = (userID) => ({
  type: UNFOLLOW,
  userID
});
const setUsers = (users) => ({
  type: SET_USERS,
  users
});
const setTotalCount = (count) => ({
  type: SET_TOTAL_COUNT,
  count
});
const setCurrentPage = (count) => ({
  type: SET_CURRENT_PAGE,
  count
});
const toggleFetchingPage = (boolean) => ({
  type: TOGGLE_FETCHING,
  boolean
});
const togglefollowindProgress = (id, boolean) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  id,
  boolean
});
 
 const followed = async (id, dispatch, api, actionCr) => {
  try {
    dispatch(togglefollowindProgress(id, true));
    let data = await api(id);
    if(data.resultCode === 0){
      dispatch(actionCr(id))
    }
    dispatch(togglefollowindProgress(id, false));
  } catch(error) {
    console.log(error);
    return Promise.reject(error)
  }
} 

export const getUsersThunkCreator  = (currentPage, pageSize) => async (dispatch) => {
  try {
    dispatch(toggleFetchingPage(true));
    let data = await usersAPI.users.getUsers(currentPage, pageSize);
    dispatch(toggleFetchingPage(false));
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
  } catch(error) {
    console.log(error);
    return Promise.reject(error)
  }
}

export const changePageThunkCreator  = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(setCurrentPage(page));
    dispatch(toggleFetchingPage(true));
    let data = await usersAPI.users.getUsers(page, pageSize);
    dispatch(toggleFetchingPage(false));
    dispatch(setUsers(data.items))
  } catch(error) {
    console.log(error);
    return Promise.reject(error)
  }
}

export const unFollowThunkCreator  = (id) => async (dispatch)  => {
  try {
    await followed(id, dispatch, usersAPI.follow.deleteFollow, unFollow);
    dispatch(delFriends(id));
  } catch(error){
    console.log(error);
    return Promise.reject(error)
  }
}

export const followThunkCreator  = (id) => async (dispatch) => {
  try {
    await followed(id, dispatch, usersAPI.follow.postFollow, follow);
    dispatch(addFriends());
  } catch(error) {
    console.log(error);
    return Promise.reject(error)
  }
}

export default usersReducer;