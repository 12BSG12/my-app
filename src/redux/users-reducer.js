const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
  usersData: [
    {id: 1, photoUrl:'https://via.placeholder.com/50', name: 'Egor D.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: true},
    {id: 2, photoUrl:'https://via.placeholder.com/50', name: 'Dima S.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: false},
    {id: 3, photoUrl:'https://via.placeholder.com/50', name: 'Vadim G.', location: {counrty: 'Russia', city: 'Osa'}, status:'I`am dump', followed: true},
    {id: 4, photoUrl:'https://via.placeholder.com/50', name: 'Alex W.', location: {counrty: 'Russia', city: 'Moscow'}, status:'I`am dump', followed: false},
  ]
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
        usersData: [...state.usersData, ...action.users]
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