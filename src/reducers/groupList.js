const groupList = (state = {
  isFetchingAdd: false,
  isFetchingGet: false,
  active: null,
  list: [],
  err: '',
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_GROUP':
      return Object.assign({}, state, {
        isFetchingAdd: true,
        err: '',
      });
    case 'RECEIVE_ADD_GROUP':
      return Object.assign({}, state, {
        isFetchingAdd: false,
        list: [...state.list, action.payload],
        err: '',
      });
    case 'ERROR_ADD_GROUP':
      return Object.assign({}, state, {
        err: action.payload,
      });
    case 'REQUEST_GET_GROUP_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
        err: '',
      });
    case 'RECEIVE_GET_GROUP_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
        err: '',
      });
    case 'CHANGE_ACTIVE_GROUP':
      return Object.assign({}, state, {
        active: action.payload,
        err: '',
      });
    default:
      return state;
  }
};

export default groupList;
