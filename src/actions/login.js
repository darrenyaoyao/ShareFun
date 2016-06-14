import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'

export const requestLogin = (username) => {
  return {
	  type: 'REQUEST_LOGIN',
		username: username
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
	  dispatch(requestLogin(username));
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
