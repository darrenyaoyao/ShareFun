const groupList = (state = {
  isFetchingAdd: false,
  isFetchingGet: false,
  active: null,
  list: [],
  err: false,
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_GROUP':
      return Object.assign({}, state, {
        isFetchingAdd: true,
      });
    case 'RECEIVE_ADD_GROUP':
      return Object.assign({}, state, {
        isFetchingAdd: false,
        err: action.err,
        list: [...state.list, action.payload],
      });
    case 'REQUEST_GET_GROUP_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
      });
    case 'RECEIVE_GET_GROUP_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
      });
    case 'CHANGE_ACTIVE_GROUP':
      return Object.assign({}, state, {
        active: action.payload,
      });
    default:
      return state;
  }
};

export default groupList;
