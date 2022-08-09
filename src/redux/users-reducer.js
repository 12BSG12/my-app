let initialState = {
  usersData: [
    {id: 1, name: 'Egor D.', counrty: 'Belarus', city: 'Minsk', stays:'I`am dump'},
    {id: 2, name: 'Egor D.', counrty: 'Belarus', city: 'Minsk', stays:'I`am dump'},
    {id: 3, name: 'Egor D.', counrty: 'Belarus', city: 'Minsk', stays:'I`am dump'},
    {id: 4, name: 'Egor D.', counrty: 'Belarus', city: 'Minsk', stays:'I`am dump'},
  ]
}

const usersReducer = (state = initialState, action) => {
  return state;
};

export default usersReducer;