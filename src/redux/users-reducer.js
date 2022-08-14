const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_PAGE_SIZE = 'SET-PAGE-SIZE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS'

let initialState = {
  usersData: [],
  pageSize: 4,
  totalCount: 0,
  currentPage: 1,
  followindInProgress: [],
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
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.count
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


export const follow = (userID) => ({
  type: FOLLOW,
  userID
}); 
export const unFollow = (userID) => ({
  type: UNFOLLOW,
  userID
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users
});
export const setPageSize = (count) => ({
  type: SET_PAGE_SIZE,
  count
});
export const setTotalCount = (count) => ({
  type: SET_TOTAL_COUNT,
  count
});
export const setCurrentPage = (count) => ({
  type: SET_CURRENT_PAGE,
  count
});

export const togglefollowindProgress = (id, boolean) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  id,
  boolean
});

export default usersReducer;