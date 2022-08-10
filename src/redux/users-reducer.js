const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
  usersData: []
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
    default:
      return state;
  }
};


export const followActionCreator = (userID) => ({
  type: FOLLOW,
  userID
}); 
export const unFollowActionCreator = (userID) => ({
  type: UNFOLLOW,
  userID
});
export const setUsersActionCreator = (users) => ({
  type: SET_USERS,
  users
});

export default usersReducer;