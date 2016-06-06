const groupFriends = (state = [], action) => {
  switch(action.type) {
	  case 'ADD_GROUP_FRIEND':
			return [...state, action.text];
		default:
			return state;
	}
}

export default groupFriends
