import fetch from 'isomorphic-fetch'

export const addFriend = (text) => {
  return {
	  type: 'ADD_FRIEND',
		text
	}
}

export const requestGetFriendList = () => {
  return {
	  type: 'REQUEST_GET_FRIEND_LIST',
	}
}

export const receiveGetFriendList = (friendList) => {
  return {
    type: 'RECEIVE_GET_FRIEND_LIST',
		payload: friendList
	}
}

export const fetchGetFriendList = (username) => {
  return dispatch => {
    dispatch(requestGetFriendList());
	  return fetch(`/api/getFriendList/${username}`,{
			method: 'GET',
		  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			}
		  })	
			.then(res => res.json())
			.then(json => {
			  dispatch(receiveGetFriendList(json.friendList))
			})
	}
}

