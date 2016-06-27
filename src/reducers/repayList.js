const repayList = (state = {
  isFetchingAdd: false,
  isFetchingGet: false,
  list: [],
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_REPAY':
      return Object.assign({}, state, {
        isFetchingAdd: true,
      });
    case 'RECEIVE_ADD_REPAY':
      return Object.assign({}, state, {
        isFetchingAdd: false,
      });
    case 'REQUEST_GET_REPAY_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
      });
    case 'RECEIVE_GET_REPAY_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
      });
    default:
      return state;
  }
};

export default repayList;
