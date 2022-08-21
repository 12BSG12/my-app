import { usersAPI } from '../api/api';

const GET_FRIENDS = 'GET-FRIENDS';

let initialState = {
  friendsData: []
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state, 
        friendsData: action.friends
      };
    default:
      return state;
  }
};

const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends
});

export const getFriendsThunkCreator = () => async (dispatch) => {
  let count = await usersAPI.users.getFriends()
  let data = await usersAPI.users.getFriends(count.totalCount);
  dispatch(getFriends(data.items));
}

export default sidebarReducer;