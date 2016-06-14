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
