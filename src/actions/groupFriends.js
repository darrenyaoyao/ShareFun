import { push } from 'react-router-redux';
export const addGroupFriend = (groupFriend) => ({
  type: 'ADD_GROUP_FRIEND',
  payload: groupFriend,
});

export const resetGroupFriends = () => ({
  type: 'RESET_GROUP_FRIENDS',
});

export const requestGetGroupFriends = () => ({
  type: 'REQUEST_GET_GROUP_FRIENDS',
});

export const receiveGetGroupFriends = (groupFriends) => ({
  type: 'RECEIVE_GET_GROUP_FRIENDS',
  payload: groupFriends,
});

export const fetchGetGroupFriends = (username, groupName) => (
  dispatch => {
    dispatch(requestGetGroupFriends());
    return fetch('/api/getGroupFriends', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        groupName,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveGetGroupFriends(json.groupFriends));
        dispatch(push(`/app/group/${groupName}`));
      });
  }
);
