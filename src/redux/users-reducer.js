import { usersAPI } from '../api/api';

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
        usersData: state.usersData.map(user => (user.id === action.userID) ? {...user, followed: true} : user)
      };
    case UNFOLLOW:
      return {
        ...state, 
        usersData: state.usersData.map(user => (user.id === action.userID) ? {...user, followed: false} : user)
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

export const getUsersThunkCreator  = (currentPage, pageSize) => (dispatch) => {
  dispatch(toggleFetchingPage(true));
  usersAPI.users.getUsers(currentPage, pageSize).then(data => {
    dispatch(toggleFetchingPage(false));
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
  });
}

export const changePageThunkCreator  = (page, pageSize) => (dispatch) => {
  dispatch(setCurrentPage(page));
  dispatch(toggleFetchingPage(true));
  usersAPI.users.getUsers(page, pageSize).then(data => {
    dispatch(toggleFetchingPage(false));
    dispatch(setUsers(data.items))
  });
}

export const unFollowThunkCreator  = (id) => (dispatch) => {
  dispatch(togglefollowindProgress(id, true));
  usersAPI.follow.deleteFollow(id).then(data => {
    if(data.resultCode === 0){
      dispatch(unFollow(id))
    }
    dispatch(togglefollowindProgress(id, false));
  });
}

export const followThunkCreator  = (id) => (dispatch) => {
  dispatch(togglefollowindProgress(id, true));
  usersAPI.follow.postFollow(id).then(data => {
    if(data.resultCode === 0){
      dispatch(follow(id))
    }
    dispatch(togglefollowindProgress(id, false));
  });
}

export default usersReducer;