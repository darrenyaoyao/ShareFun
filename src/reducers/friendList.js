const friendList = (state = {
  isFetching: false,
  list: [],
  err: false   
}, action) => {
  switch(action.type) {
	  case 'REQUEST_ADD_FRIEND':
			return Object.assign({}, state, {
           isFetching: true,
         });
      case 'RECEIVE_ADD_FRIEND':
         return Object.assign({}, state, {
           isFetching: false,
           err: action.err,
           list: [...state.friendList, action.friendname]
         });
		default:
			return state;
	}
}

export default friendList
