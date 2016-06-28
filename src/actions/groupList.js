import fetch from 'isomorphic-fetch';

export const requestAddGroup = () => ({
  type: 'REQUEST_ADD_GROUP',
});

export const receiveAddGroup = (json, groupName) => ({
  type: 'RECEIVE_ADD_GROUP',
  payload: groupName,
});

export const fetchAddGroup = function fetchAddGroup(username, groupName, groupFriends) {
  return dispatch => {
    dispatch(requestAddGroup());
    return fetch('/api/addGroup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        groupName,
        groupFriends,
      }),
    })
     .then(res => res.json())
     .then(json => {
       dispatch(receiveAddGroup(json, groupName));
     });
  };
};

export const errorAddGroup = (err) => ({
  type: 'ERROR_ADD_GROUP',
  payload: err,
});

export const requestGetGroupList = () => ({
  type: 'REQUEST_GET_GROUP_LIST',
});

export const receiveGetGroupList = (groupList) => ({
  type: 'RECEIVE_GET_GROUP_LIST',
  payload: groupList,
});

export const fetchGetGroupList = function fetchGetGroupList(username) {
  return dispatch => {
    dispatch(requestGetGroupList());
    return fetch(`/api/getGroupList/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveGetGroupList(json.groupList));
      });
  };
};

export const changeActiveGroup = (groupName) => ({
  type: 'CHANGE_ACTIVE_GROUP',
  payload: groupName,
});
