const groupList = (state = [], action) => {
  switch(action.type) {
	  case 'ADD_GROUP':
			return [...state, action.info];
		case 'RESET_GROUP_FRIENDS':
			return [];
		default:
			return state;
	}
}

export default groupList
