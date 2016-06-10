const groupList = (state = [], action) => {
  switch(action.type) {
	  case 'ADD_GROUP':
			return [...state, action.info];
		default:
			return state;
	}
}

export default groupList
