import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'

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

export const requestLogin = () => {
  return {
	  type: 'REQUEST_LOGIN'
	}
}

export const receiveLogin = (json) => {
  return {
	  type: 'RECEIVE_LOGIN',
		err: !json.success
	}
}

export const fetchLogin = (username, password) => {
  return dispatch => {
	  dispatch(requestLogin());
		return fetch('/api/login',{
		  method: 'POST',
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  username,
			  password
			})
		})
			.then(res => res.json())
			.then(json => {
				dispatch(receiveLogin(json));
				if(json.success){
				  dispatch(push('/app/addGroup'));
				}
			})
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
