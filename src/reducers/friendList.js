const friendList = (state = {
  isFetching: false,
  list: [],
  err: 0,
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_FRIEND':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_ADD_FRIEND':
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err,
        list: (action.err !== 0) ? (state.list) :
              ([...state.list, action.friendname]),
      });
    case 'REQUEST_GET_FRIEND_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
      });
    case 'RECEIVE_GET_FRIEND_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
      });
    default:
      return state;
  }
};

export default friendList;
