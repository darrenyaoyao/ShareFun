const display = (state = 'groupList', action) => {
  switch(action.type) {
	  case 'SET_DISPLAY':
			return action.text;
		default:
			return state;
	}
}

export default display
