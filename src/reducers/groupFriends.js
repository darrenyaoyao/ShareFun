const groupFriends = (state = [], action) => {
  switch(action.type) {
	  case 'ADD_GROUP_FRIEND':
			return [...state, action.text];
		case 'RESET_GROUP_FRIENDS':
			return []
		default:
			return state;
	}
}

export default groupFriends
