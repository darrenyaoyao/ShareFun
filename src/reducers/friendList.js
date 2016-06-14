const friendList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRIEND':
      return [...state, action.text];
    default:
      return state;
  }
};

export default friendList;
