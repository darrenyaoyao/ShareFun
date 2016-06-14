import fetch from 'isomorphic-fetch'

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

export const requestGetGroupList = () => {
  return {
	  type: 'REQUEST_GET_GROUP_LIST',
	}
}

export const receiveGetGroupList = (groupList) => {
  return {
    type: 'RECEIVE_GET_GROUP_LIST',
		groupList: groupList
	}
}

export const fetchGetGroupList = (username) => {
  return dispatch => {
    dispatch(requestGetGroupList());
	  return fetch(`/api/getGroupList/${username}`,{
			method: 'GET',
		  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			}
		  })	
			.then(res => res.json())
			.then(json => {
			  dispatch(receiveGetGroupList(json.groupList))
			})
	}
}

