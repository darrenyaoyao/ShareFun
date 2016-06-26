const groupFriends = (state = {
  isFetching: false,
  list: [],
}, action) => {
  switch (action.type) {
    case 'ADD_GROUP_FRIEND':
      return Object.assign({}, state, {
        list: [...state.list, action.payload],
      });
    case 'RESET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        list: [],
      });
    case 'REQUEST_GET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_GET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload,
      });
    default:
      return state;
  }
};

export default groupFriends;
