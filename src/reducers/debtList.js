const debtList = (state = {
  isFetching: false,
	list: [],
	err: false
}, action) => {
  switch(action.type){
	  case 'REQUEST_ADD_DEBT':
			return Object.assign({}, state, {
		    isFetching: true,	
			});
		case 'RECEIVE_ADD_DEBT':
			return Object.assign({}, state, {
		    isFetching: false,	
				err: action.err,
				list: [...state.list, action.payload]
			
			});
		default:
			return state;
	}
}

export default debtList
