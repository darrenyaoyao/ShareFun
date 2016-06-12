const groupList = (state = {
  isFetching: false,
  list: [],
  err: false	
}, action) => {
  switch(action.type) {
	  case 'REQUEST_ADD_GROUP':
			return Object.assign({}, state, {
			  isFetching: true,
			});
		case 'RECEIVE_ADD_GROUP':
			return Object.assign({}, state, {
			  isFetching: false,
				err: action.err,
				list: [...state.list, action.groupInfo]
			});
		default:
			return state;
	}
}

export default groupList
