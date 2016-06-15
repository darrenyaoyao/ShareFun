 import fetch from 'isomorphic-fetch';

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
    console.log(username);
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

export const requestGetFriendList = () => ({
  type: 'REQUEST_GET_FRIEND_LIST',
});

export const receiveGetFriendList = (friendList) => ({
  type: 'RECEIVE_GET_FRIEND_LIST',
  payload: friendList,
});

export const fetchGetFriendList = function fetchGetFriendList(username) {
  return dispatch => {
    dispatch(requestGetFriendList());
    return fetch(`/api/getFriendList/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
			.then(res => res.json())
			.then(json => { dispatch(receiveGetFriendList(json.friendList)); });
  };
};

