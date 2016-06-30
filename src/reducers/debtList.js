const debtList = (state = {
  isFetchingAdd: false,
  isFetchingGet: false,
  isFetchingRepay: false,
  list: [],
  repayList: [],
  settled: false,
  err: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case 'REQUEST_ADD_DEBT':
      return Object.assign({}, state, {
        isFetchingAdd: true,
        errorMessage: '',
      });
    case 'RECEIVE_ADD_DEBT':
      return Object.assign({}, state, {
        isFetchingAdd: false,
        err: action.err,
        list: [...state.list, action.payload],
        errorMessage: '',
      });
    case 'ERROR_ADD_DEBT':
      return Object.assign({}, state, {
        errorMessage: action.payload,
      });
    case 'REQUEST_GET_DEBT_LIST':
      return Object.assign({}, state, {
        isFetchingGet: true,
        errorMessage: '',
      });
    case 'RECEIVE_GET_DEBT_LIST':
      return Object.assign({}, state, {
        isFetchingGet: false,
        list: action.payload,
        errorMessage: '',
      });
    case 'REQUEST_GET_GROUP_REPAY':
      return Object.assign({}, state, {
        isFetchingRepay: true,
        errorMessage: '',
      });
    case 'RECEIVE_GET_GROUP_REPAY':
      return Object.assign({}, state, {
        isFetchingRepay: false,
        settled: true,
        repayList: action.payload,
        errorMessage: '',
      });
    default:
      return state;
  }
};

export default debtList;
