import {getUserDataThunkCreator} from './auth-reducer'

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
  initialized: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state, 
        initialized: true
      };
    default:
      return state;
  }
};

const setInitialized = () => ({
  type: SET_INITIALIZED,
});

export const setInitializedThunkCreator = () => (dispatch) =>{
  let promise = dispatch(getUserDataThunkCreator());
  Promise.all([promise]).then(() => {
    dispatch(setInitialized());
  }).catch((err) => console.log(err));
}

export default appReducer;