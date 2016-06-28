const groupFriends = (state = {
  isFetching: false,
  list: [],
  err: '',
}, action) => {
  switch (action.type) {
    case 'ADD_GROUP_FRIEND':
      return Object.assign({}, state, {
        list: [...state.list, action.payload],
        err: '',
      });
    case 'REMOVE_GROUP_FRIEND':
      return Object.assign({}, state, {
        list: state.list.filter(x => (x !== action.payload)),
        err: '',
      });
    case 'RESET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        list: [],
        err: '',
      });
    case 'REQUEST_GET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        isFetching: true,
        err: '',
      });
    case 'RECEIVE_GET_GROUP_FRIENDS':
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload,
        err: '',
      });
    case 'ERROR_GROUP_FRIEND':
      return Object.assign({}, state, {
        err: action.payload,
      });
    default:
      return state;
  }
};

export default groupFriends;
