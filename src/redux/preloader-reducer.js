const TOGGLE_FETCHING = 'TOGGLE-FETCHING';

let initialState = {
  isFetching: false,
}

const preloaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.boolean
      }
    default:
      return state;
  }
};

export const toggleFetchingPage = (boolean) => ({
  type: TOGGLE_FETCHING,
  boolean
});


export default preloaderReducer;