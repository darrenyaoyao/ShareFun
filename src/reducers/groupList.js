const groupList = (state = {
  isFetchingAdd: false,
	isFetchingGet: false,
  list: [],
  err: false	
}, action) => {
  switch(action.type) {
	  case 'REQUEST_ADD_GROUP':
			return Object.assign({}, state, {
			  isFetchingAdd: true,
			});
		case 'RECEIVE_ADD_GROUP':
			return Object.assign({}, state, {
			  isFetchingAdd: false,
				err: action.err,
				list: [...state.list, action.groupInfo]
			});
		case 'REQUEST_GET_GROUP_LIST':
			return Object.assign({}, state, {
				isFetchingGet: true,	
			});
		case 'RECEIVE_GET_GROUP_LIST':
			return Object.assign({}, state, {
			  isFetchingGet: false,
				list: action.groupList
			});
		default:
			return state;
	}
}

export default groupList
