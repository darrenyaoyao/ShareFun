const login = (state = {
	isFetching: false,
  err: false
}, action) => {
  switch(action.type) {
	  case 'REQUEST_LOGIN':
			return Object.assign({}, state, {
				isFetching: true,
			  username: action.payload
			});
		case 'RECEIVE_LOGIN':
      return Object.assign({}, state, {
			  isFetching: false,
				err: action.err
			})
		default:
			return state;
	}
}

export default login
