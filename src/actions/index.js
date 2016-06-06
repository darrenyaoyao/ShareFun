export const setDisplay = (text) => {
  return {
	  type: 'SET_DISPLAY',
		text
	}
}

export const addFriend = (text) => {
  return {
	  type: 'ADD_FRIEND',
		text
	}
}

// vertification = [username, password]
export const login = (vertification) => {
  return {
	  type: 'LOGIN',
		vertification
	}
}

// info = {groupName,friendList}
export const addGroup = (info) => {
  return {
	  type: 'ADD_GROUP',
		info
	}
}

export const addGroupFriend = (text) => {
  return {
	  type: 'ADD_GROUP_FRIEND', 
		text
	}
}

export const resetGroupFriends = () => {
  return {
	  type: 'RESET_GROUP_FRIENDS'
	}
}
