const debtList = (state = {
  isFetchingAdd: false,
  isFetchingGet: false,
  list: [],
  err: false,
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_DEBT':
      return Object.assign({}, state, {
        isFetchingAdd: true,
      });
    case 'RECEIVE_ADD_DEBT':
      return Object.assign({}, state, {
        isFetchingAdd: false,
        err: action.err,
        list: [...state.list, action.payload],
      });
    case 'REQUEST_GET_DEBT_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
      });
    case 'RECEIVE_GET_DEBT_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
      });
    default:
      return state;
  }
};

export default debtList;
