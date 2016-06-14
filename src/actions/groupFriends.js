export const addGroupFriend = (groupFriend) => {
  return {
	  type: 'ADD_GROUP_FRIEND', 
		payload: groupFriend
	}
}

export const resetGroupFriends = () => {
  return {
	  type: 'RESET_GROUP_FRIENDS'
	}
}
