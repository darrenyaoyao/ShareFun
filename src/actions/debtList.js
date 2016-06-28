import fetch from 'isomorphic-fetch';

export const requestAddDebt = () => ({
  type: 'REQUEST_ADD_DEBT',
});

export const receiveAddDebt = (json, debt) => ({
  type: 'RECEIVE_ADD_DEBT',
  err: !json.success,
  payload: debt,
});

export const fetchAddDebt = function fetchAddDebt(username, groupName, debtContent) {
  return dispatch => {
    dispatch(requestAddDebt());
    return fetch('/api/addDebt', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        groupName,
        debtContent,
      }),
    })
			.then(res => res.json())
			.then(json => { dispatch(receiveAddDebt(json, debtContent)); });
  };
};

export const requestGetDebtList = () => ({
  type: 'REQUEST_GET_DEBT_LIST',
});

export const receiveGetDebtList = (debtList) => ({
  type: 'RECEIVE_GET_DEBT_LIST',
  payload: debtList,
});

export const fetchGetDebtList = function fetchGetDebtList(username, groupName) {
  return dispatch => {
    dispatch(requestGetDebtList());
    return fetch(`/api/getDebtList/${username}&&${groupName}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveGetDebtList(json.debtList));
      });
  };
};

export const requestGetGroupRepay = () => ({
  type: 'REQUEST_GET_GROUP_REPAY',
});

export const receiveGetGroupRepay = (groupRepay) => ({
  type: 'RECEIVE_GET_GROUP_REPAY',
  payload: groupRepay,
});

export const fetchGetGroupRepay = (username, groupName) => (
  dispatch => {
    dispatch(requestGetGroupRepay());
    return fetch(`/api/getGroupRepay/${username}&&${groupName}`, {
    })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveGetGroupRepay(json.groupRepay));
      });
  }
);
