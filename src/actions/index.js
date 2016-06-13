import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'

export const setDisplay = (text) => {
  return {
	  type: 'SET_DISPLAY',
		text
	}
}


//AddFriend
export const requestAddFriend = (friendname) => {
  return {
     type: 'REQUEST_ADD_FRIEND',
      friendname: friendname
   }
}

export const receiveAddFriend = (json, friendname) => {
  return {
     type: 'RECEIVE_ADD_FRIEND',
     friendname: friendname,
      err: !json.success
   }
}

export const fetchAddFriend = (username, friendname) => {
   return dispatch => {
      dispatch(requestAddFriend(friendname));
      return fetch('/api/addfriend',{
        method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            username,
            friendname
         })
      })
         .then(res => res.json())
         .then(json => {
            dispatch(receiveLogin(json, friendname));
         })
   }
}

//Login
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

export const requestAddGroup = () => {
  return {
	  type: 'REQUEST_ADD_GROUP'
	}
}

export const receiveAddGroup = (json,groupName,groupFriends) => {
  return {
	  type: 'RECEIVE_ADD_GROUP',
	  groupInfo: {groupName, groupFriends},
      err: !json.success
	}
}

export const fetchAddGroup = (username,groupName,groupFriends) => {
  return dispatch => {
	  dispatch(requestAddGroup());
		return fetch('/api/addGroup', {
		  method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
			  groupName,
			  groupFriends
			})
		})
		 .then(res => res.json())
		 .then(json => {
		   dispatch(receiveAddGroup(json, groupName, groupFriends))
		 })
	} 
}

export const requestAddDebt = () => {
  return {
	  type: 'REQUEST_ADD_DEBT',
	}
}

export const receiveAddDebt = (json, debt) => {
  return {
	  type: 'RECEIVE_ADD_DEBT',
		err: !json.success,
		debt: debt
	}
}

export const fetchAddDebt = (username, groupName, debtContent) => {
  return dispatch => {
	  dispatch(requestAddDebt());
		return fetch('/api/addDebt',{
		  method: 'POST',
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  username,
			  groupName,
			  debtContent
			})
		})
			.then(res => res.json())
			.then(json => {
				dispatch(receiveAddDebt(json, debtContent));
			})
	}
}

export const addDebtor = (newDebtor) => {
  return {
	  type: 'ADD_DEBTOR',
		newDebtor: newDebtor
	}
}

export const resetNewDebt = () => {
  return {
	  type: 'RESET_NEW_DEBT'
	}
}
