import { usersAPI } from '../api/api';

const GET_FRIENDS = 'GET-FRIENDS';
const GET_COUNT = 'GET_COUNT';
const DEL_FRIENDS = 'DEL-FRIENDS';
const ADD_FRIENDS = 'ADD-FRIENDS';

let initialState = {
  friendsData: [],
  count: 0
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state, 
        friendsData: action.friends
      };
    case GET_COUNT:
      return {
        ...state, 
        count: action.count
      };
    case DEL_FRIENDS:
      return {
        ...state, 
        friendsData: [...state.friendsData.filter(item => item.id !== action.friendsId)],
        count: state.count - 1
      };
    case ADD_FRIENDS:
      return {
        ...state, 
        count: state.count + 1
      };
    default:
      return state;
  }
};

const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends
});

const getCount = (count) => ({
  type: GET_COUNT,
  count
});

export const delFriends = (friendsId) => ({
  type: DEL_FRIENDS,
  friendsId
});

export const addFriends = () => ({
  type: ADD_FRIENDS
});

export const getFriendsThunkCreator = (totalCount) => async (dispatch) => {
  try {
    let count = await usersAPI.users.getFriends();
    dispatch(getCount(count.totalCount));
    let data = await usersAPI.users.getFriends(totalCount);
    dispatch(getFriends(data.items));
  } catch (error) {
    console.log(error);
    return Promise.reject(error)
  }
}

export default sidebarReducer;